import {
  DataCache,
  PatientDataPipeline,
  PatientData,
  Measurement,
  AggregationResult,
} from '../patientDataPipeline';

describe('Patient Data Pipeline - Senior Engineering Challenge', () => {
  let pipeline: PatientDataPipeline;

  beforeEach(() => {
    pipeline = new PatientDataPipeline(100);
  });

  // ============================================================
  // PART 1: CACHING LAYER & PERFORMANCE OPTIMIZATION
  // ============================================================

  describe('PART 1: DataCache - LRU & TTL Implementation', () => {
    let cache: DataCache<string>;

    beforeEach(() => {
      cache = new DataCache(3, 1000); // Max 3 items, 1 second TTL
    });

    describe('Basic Operations', () => {
      it('should store and retrieve data', () => {
        cache.set('key1', 'value1');
        expect(cache.get('key1')).toBe('value1');
      });

      it('should return null for non-existent key', () => {
        expect(cache.get('nonexistent')).toBeNull();
      });

      it('should track cache hits and misses', () => {
        cache.set('key1', 'value1');
        cache.get('key1'); // Hit
        cache.get('key1'); // Hit
        cache.get('missing'); // Miss

        const metrics = cache.getMetrics();
        expect(metrics.hits).toBe(2);
        expect(metrics.misses).toBe(1);
      });
    });

    describe('LRU Eviction Policy', () => {
      it('should evict least recently used item when capacity exceeded', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.set('key3', 'value3');

        // Access key1 to mark it as recently used
        cache.get('key1');

        // Add new item - should evict key2 (least recently used)
        cache.set('key4', 'value4');

        expect(cache.get('key1')).toBe('value1');
        expect(cache.get('key2')).toBeNull(); // Evicted
        expect(cache.get('key3')).toBe('value3');
        expect(cache.get('key4')).toBe('value4');
      });

      it('should update LRU order on get operations', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.set('key3', 'value3');

        cache.get('key1'); // Make key1 recently used
        cache.set('key4', 'value4'); // Should evict key2, not key1

        expect(cache.get('key1')).toBe('value1');
        expect(cache.get('key2')).toBeNull(); // Evicted
      });

      it('should handle multiple evictions when adding many items', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.set('key3', 'value3');
        cache.set('key4', 'value4');
        cache.set('key5', 'value5');

        expect(cache.get('key1')).toBeNull(); // Evicted
        expect(cache.get('key2')).toBeNull(); // Evicted
        expect(cache.get('key3')).toBe('value3');
        expect(cache.get('key4')).toBe('value4');
        expect(cache.get('key5')).toBe('value5');
      });
    });

    describe('TTL (Time To Live) Expiration', () => {
      it('should return null for expired entries', async () => {
        cache.set('key1', 'value1');
        expect(cache.get('key1')).toBe('value1');

        // Wait for TTL to expire
        await new Promise((resolve) => setTimeout(resolve, 1100));

        expect(cache.get('key1')).toBeNull();
      });

      it('should not count expired entries as hits', async () => {
        cache.set('key1', 'value1');
        cache.get('key1'); // Hit

        await new Promise((resolve) => setTimeout(resolve, 1100));

        cache.get('key1'); // Miss (expired)
        const metrics = cache.getMetrics();
        expect(metrics.hits).toBe(1);
        expect(metrics.misses).toBe(1);
      });
    });

    describe('Cleanup Operations', () => {
      it('should remove expired entries', async () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');

        await new Promise((resolve) => setTimeout(resolve, 1100));

        const cleaned = cache.cleanup();
        expect(cleaned).toBe(2);
        expect(cache.get('key1')).toBeNull();
        expect(cache.get('key2')).toBeNull();
      });

      it('should not remove non-expired entries during cleanup', async () => {
        cache.set('key1', 'value1');
        await new Promise((resolve) => setTimeout(resolve, 500));
        cache.set('key2', 'value2');

        await new Promise((resolve) => setTimeout(resolve, 600));

        const cleaned = cache.cleanup();
        expect(cleaned).toBe(1); // Only key1 expired
        expect(cache.get('key1')).toBeNull();
        expect(cache.get('key2')).toBe('value2');
      });
    });

    describe('Edge Cases', () => {
      it('should handle cache size of 1', () => {
        const smallCache = new DataCache(1, 1000);
        smallCache.set('key1', 'value1');
        smallCache.set('key2', 'value2');

        expect(smallCache.get('key1')).toBeNull(); // Evicted
        expect(smallCache.get('key2')).toBe('value2');
      });

      it('should calculate hit rate correctly', () => {
        cache.set('key1', 'value1');
        cache.get('key1');
        cache.get('key1');
        cache.get('missing');

        const metrics = cache.getMetrics();
        expect(metrics.hitRate).toBe(2 / 3);
      });
    });
  });

  // ============================================================
  // PART 2: DATA AGGREGATION & OPTIMIZATION
  // ============================================================

  describe('PART 2: PatientDataPipeline - Aggregation & Optimization', () => {
    const createMeasurement = (
      type: Measurement['type'],
      value: number,
      minutesAgo: number = 0
    ): Measurement => ({
      type,
      value,
      unit: type === 'heart_rate' ? 'bpm' : 'mg/dL',
      timestamp: new Date(Date.now() - minutesAgo * 60000),
    });

    const createPatientData = (id: string, age: number = 45): PatientData => ({
      id,
      name: `Patient ${id}`,
      age,
      timestamp: new Date(),
      measurements: [
        createMeasurement('heart_rate', 72, 10),
        createMeasurement('heart_rate', 75, 5),
        createMeasurement('glucose', 120, 10),
        createMeasurement('glucose', 115, 5),
      ],
    });

    describe('Basic Aggregation', () => {
      it('should aggregate patient data correctly', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const result = pipeline.getAggregation('P001');
        expect(result).not.toBeNull();
        expect(result?.patientId).toBe('P001');
        expect(result?.totalMeasurements).toBe(4);
      });

      it('should calculate average heart rate correctly', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const result = pipeline.getAggregation('P001');
        expect(result?.averageHeartRate).toBe(73.5); // (72 + 75) / 2
      });

      it('should calculate average glucose correctly', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const result = pipeline.getAggregation('P001');
        expect(result?.averageGlucose).toBe(117.5); // (120 + 115) / 2
      });
    });

    describe('Caching & Performance', () => {
      it('should cache aggregation results', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const result1 = pipeline.getAggregation('P001');
        const result2 = pipeline.getAggregation('P001');

        expect(result1).toEqual(result2);
        const metrics = pipeline.getMetrics();
        expect(metrics.cacheHits).toBeGreaterThan(0);
      });

      it('should not recompute when data unchanged', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const metrics1 = pipeline.getMetrics();
        const initialComputations = metrics1.recordsProcessed;

        // Add same patient data again - should use cache
        pipeline.addPatientData(patientData);

        const metrics2 = pipeline.getMetrics();
        // TODO: Verify this behavior - implement data change detection
      });
    });

    describe('Batch Operations', () => {
      it('should batch add multiple patients', () => {
        const patients = [
          createPatientData('P001'),
          createPatientData('P002'),
          createPatientData('P003'),
        ];

        pipeline.batchAddPatientData(patients);

        const metrics = pipeline.getMetrics();
        expect(metrics.recordsProcessed).toBe(3);
      });

      it('should handle partial batch failures gracefully', () => {
        const patients = [createPatientData('P001'), createPatientData('P002')];

        expect(() => {
          pipeline.batchAddPatientData(patients);
        }).not.toThrow();
      });
    });

    describe('Risk Scoring', () => {
      it('should calculate risk score based on measurements', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const result = pipeline.getAggregation('P001');
        expect(result?.riskScore).toBeGreaterThanOrEqual(0);
        expect(result?.riskScore).toBeLessThanOrEqual(100);
      });

      it('should increase risk for abnormal heart rate', () => {
        const patientData = createPatientData('P001');
        patientData.measurements = [
          createMeasurement('heart_rate', 45, 5), // Too low
          createMeasurement('heart_rate', 130, 0), // Too high
        ];
        pipeline.addPatientData(patientData);

        const result = pipeline.getAggregation('P001');
        expect(result?.riskScore).toBeGreaterThan(0);
      });

      it('should increase risk for high glucose', () => {
        const patientData = createPatientData('P001');
        patientData.measurements = [createMeasurement('glucose', 250, 5)];
        pipeline.addPatientData(patientData);

        const result = pipeline.getAggregation('P001');
        expect(result?.riskScore).toBeGreaterThan(0);
      });

      it('should increase risk for age over 65', () => {
        const patientDataYoung = createPatientData('P001', 40);
        const patientDataOld = createPatientData('P002', 70);

        pipeline.addPatientData(patientDataYoung);
        pipeline.addPatientData(patientDataOld);

        const resultYoung = pipeline.getAggregation('P001');
        const resultOld = pipeline.getAggregation('P002');

        expect(resultOld?.riskScore).toBeGreaterThan(resultYoung?.riskScore || 0);
      });
    });

    describe('Query Operations', () => {
      it('should query patients by risk score range', () => {
        const patients = [
          createPatientData('P001', 30),
          createPatientData('P002', 50),
          createPatientData('P003', 75),
        ];

        patients.forEach((p) => pipeline.addPatientData(p));

        const highRiskPatients = pipeline.queryPatientsByRiskScore(5, 100);
        expect(highRiskPatients.length).toBeGreaterThan(0);
        highRiskPatients.forEach((result) => {
          expect(result.riskScore).toBeGreaterThanOrEqual(5);
          expect(result.riskScore).toBeLessThanOrEqual(100);
        });
      });

      it('should return empty array for no matching patients', () => {
        const patients = [createPatientData('P001', 30)];
        patients.forEach((p) => pipeline.addPatientData(p));

        const results = pipeline.queryPatientsByRiskScore(90, 100);
        expect(results.length).toBe(0);
      });
    });

    describe('Error Handling', () => {
      it('should throw error for non-existent patient', () => {
        expect(() => {
          pipeline.getAggregation('nonexistent');
        }).toThrow();
      });

      it('should handle errors gracefully and update metrics', () => {
        const metrics1 = pipeline.getMetrics();
        const initialErrors = metrics1.errors;

        try {
          pipeline.getAggregation('nonexistent');
        } catch (e) {
          // Expected
        }

        const metrics2 = pipeline.getMetrics();
        expect(metrics2.errors).toBeGreaterThan(initialErrors);
      });
    });

    describe('Metrics & Observability', () => {
      it('should track records processed', () => {
        const patients = [createPatientData('P001'), createPatientData('P002')];
        patients.forEach((p) => pipeline.addPatientData(p));

        const metrics = pipeline.getMetrics();
        expect(metrics.recordsProcessed).toBe(2);
      });

      it('should calculate average processing time', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        const metrics = pipeline.getMetrics();
        expect(metrics.averageProcessingTime).toBeGreaterThan(0);
      });

      it('should track cache performance', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);
        pipeline.getAggregation('P001');
        pipeline.getAggregation('P001');

        const metrics = pipeline.getMetrics();
        expect(metrics.cacheHits).toBeGreaterThan(0);
      });
    });

    describe('Resource Cleanup', () => {
      it('should cleanup resources on shutdown', () => {
        const patientData = createPatientData('P001');
        pipeline.addPatientData(patientData);

        expect(() => {
          pipeline.shutdown();
        }).not.toThrow();
      });
    });
  });

  // ============================================================
  // PART 3: ADVANCED CHALLENGES
  // ============================================================

  describe('PART 3: Advanced Features for Senior Engineers', () => {
    it('TODO: Implement thread-safety for concurrent operations', () => {
      // Implement proper locking/queue mechanisms
      // Ensure data consistency under concurrent load
      expect(true).toBe(true);
    });

    it('TODO: Implement incremental aggregation', () => {
      // Calculate delta for new measurements
      // Avoid full recalculation for small changes
      expect(true).toBe(true);
    });

    it('TODO: Implement query indexes for performance', () => {
      // Support efficient range queries
      // Implement time-series optimizations
      expect(true).toBe(true);
    });

    it('TODO: Implement circuit breaker for resilience', () => {
      // Handle failures gracefully
      // Implement retry logic with backoff
      expect(true).toBe(true);
    });

    it('TODO: Implement memory limit enforcement', () => {
      // Prevent memory leaks
      // Implement efficient garbage collection
      expect(true).toBe(true);
    });

    it('TODO: Implement distributed tracing', () => {
      // Track requests across components
      // Implement performance profiling
      expect(true).toBe(true);
    });
  });
});
