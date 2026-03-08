// Patient Data Pipeline - Senior Engineering Challenge for Cadence Interview

/**
 * SENIOR CHALLENGE: Patient Data Pipeline with Caching and Performance Optimization
 * 
 * This challenge simulates a real-world data processing system that must handle:
 * - High-volume patient data ingestion
 * - Complex aggregation and analytics
 * - Caching strategies for performance
 * - Data consistency and race conditions
 * - Memory optimization
 * - Error handling and resilience
 * 
 * Focus areas:
 * ✓ System architecture decisions
 * ✓ Performance optimization (caching, batching)
 * ✓ Concurrency handling
 * ✓ Memory management
 * ✓ Error resilience
 * ✓ Testing and observability
 */

export interface PatientData {
  id: string;
  name: string;
  age: number;
  timestamp: Date;
  measurements: Measurement[];
}

export interface Measurement {
  type: 'heart_rate' | 'blood_pressure' | 'glucose' | 'weight' | 'steps';
  value: number;
  unit: string;
  timestamp: Date;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  expiresAt: Date;
}

export interface AggregationResult {
  patientId: string;
  totalMeasurements: number;
  averageHeartRate?: number;
  averageGlucose?: number;
  lastMeasurementTime?: Date;
  riskScore: number;
  computedAt: Date;
}

export interface PipelineMetrics {
  recordsProcessed: number;
  cacheHits: number;
  cacheMisses: number;
  averageProcessingTime: number;
  memoryUsage: number;
  errors: number;
}

/**
 * PART 1: CACHING LAYER & PERFORMANCE OPTIMIZATION
 * 
 * The DataCache class needs to implement:
 * 1. LRU (Least Recently Used) eviction policy
 * 2. TTL (Time To Live) expiration
 * 3. Memory limit enforcement
 * 4. Cache hit/miss tracking for metrics
 * 
 * Current implementation has bugs:
 * - No LRU eviction when capacity is exceeded
 * - No TTL checking on retrieval
 * - Memory tracking is inaccurate
 */
export class DataCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private accessOrder: string[] = []; // Track access order for LRU
  private maxSize: number;
  private ttlMs: number;
  private metrics = {
    hits: 0,
    misses: 0,
  };

  constructor(maxSize: number = 1000, ttlMs: number = 60000) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  // BUG: Doesn't check TTL or update access order
  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.metrics.misses++;
      return null;
    }

    // TODO: Check if entry has expired (entry.expiresAt < now)
    // TODO: Update access order for LRU tracking
    this.metrics.hits++;
    return entry.data;
  }

  // BUG: Doesn't evict LRU items when capacity exceeded
  set(key: string, value: T): void {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.ttlMs);

    this.cache.set(key, { data: value, timestamp: now, expiresAt });
    
    // TODO: Update access order
    // TODO: Check capacity and evict LRU if needed
    // TODO: Handle case where cache is at max capacity
  }

  // BUG: Doesn't properly clean expired entries
  cleanup(): number {
    const now = new Date();
    let cleanedCount = 0;

    // TODO: Iterate through cache and remove expired entries
    // TODO: Return count of cleaned entries

    return cleanedCount;
  }

  getMetrics() {
    return {
      ...this.metrics,
      cacheSize: this.cache.size,
      hitRate: this.metrics.hits / (this.metrics.hits + this.metrics.misses) || 0,
    };
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }
}

/**
 * PART 2: DATA AGGREGATION & OPTIMIZATION
 * 
 * PatientDataPipeline needs to:
 * 1. Batch process patient records efficiently
 * 2. Use caching to avoid redundant computations
 * 3. Handle concurrent requests
 * 4. Implement incremental aggregation
 * 
 * Current issues:
 * - Recomputes aggregations even when data hasn't changed
 * - No batching optimization
 * - Race conditions in concurrent updates
 */
export class PatientDataPipeline {
  private cache: DataCache<AggregationResult>;
  private patients: Map<string, PatientData> = new Map();
  private metrics: PipelineMetrics = {
    recordsProcessed: 0,
    cacheHits: 0,
    cacheMisses: 0,
    averageProcessingTime: 0,
    memoryUsage: 0,
    errors: 0,
  };
  private aggregationCache: Map<string, { lastHash: string; result: AggregationResult }> =
    new Map();

  constructor(cacheSize: number = 1000) {
    this.cache = new DataCache(cacheSize);
  }

  /**
   * Add patient data - should check if data changed before recomputation
   * 
   * BUG: Always recomputes aggregation even if data is identical
   */
  addPatientData(patientData: PatientData): void {
    const startTime = Date.now();

    try {
      this.patients.set(patientData.id, patientData);
      
      // TODO: Check if data hash changed since last aggregation
      // TODO: Only recompute if data actually changed
      this.aggregatePatientData(patientData.id);
      
      this.metrics.recordsProcessed++;
    } catch (error) {
      this.metrics.errors++;
      throw error;
    } finally {
      this.metrics.averageProcessingTime =
        (this.metrics.averageProcessingTime * (this.metrics.recordsProcessed - 1) +
          (Date.now() - startTime)) /
        this.metrics.recordsProcessed;
    }
  }

  /**
   * Batch add multiple patients - should be optimized
   * 
   * TODO: Implement batch processing for better performance
   * TODO: Consider bulk cache operations
   * TODO: Handle partial failures gracefully
   */
  batchAddPatientData(patientDataList: PatientData[]): void {
    // TODO: Process multiple patients efficiently
    // TODO: Consider transaction semantics
    // TODO: Implement rollback on failure
    for (const patientData of patientDataList) {
      this.addPatientData(patientData);
    }
  }

  /**
   * Aggregate patient data - currently doesn't use caching effectively
   * 
   * BUG: Doesn't check cache before computation
   * BUG: Doesn't validate data consistency
   */
  aggregatePatientData(patientId: string): AggregationResult {
    // TODO: Check cache first
    const cachedResult = this.cache.get(patientId);
    if (cachedResult) {
      this.metrics.cacheHits++;
      return cachedResult;
    }

    const patientData = this.patients.get(patientId);
    if (!patientData) {
      throw new Error(`Patient ${patientId} not found`);
    }

    this.metrics.cacheMisses++;

    const heartRateMeasurements = patientData.measurements.filter(
      (m) => m.type === 'heart_rate'
    );
    const glucoseMeasurements = patientData.measurements.filter(
      (m) => m.type === 'glucose'
    );

    const result: AggregationResult = {
      patientId,
      totalMeasurements: patientData.measurements.length,
      averageHeartRate:
        heartRateMeasurements.length > 0
          ? heartRateMeasurements.reduce((sum, m) => sum + m.value, 0) /
            heartRateMeasurements.length
          : undefined,
      averageGlucose:
        glucoseMeasurements.length > 0
          ? glucoseMeasurements.reduce((sum, m) => sum + m.value, 0) /
            glucoseMeasurements.length
          : undefined,
      lastMeasurementTime: patientData.measurements.length > 0
        ? new Date(Math.max(...patientData.measurements.map((m) => m.timestamp.getTime())))
        : undefined,
      riskScore: this.calculateRiskScore(patientData),
      computedAt: new Date(),
    };

    this.cache.set(patientId, result);
    return result;
  }

  /**
   * Calculate risk score - should be optimized
   * 
   * TODO: Implement efficient risk calculation
   * TODO: Consider incremental updates instead of full recalculation
   */
  private calculateRiskScore(patientData: PatientData): number {
    let score = 0;

    // Abnormal heart rate
    const hrMeasurements = patientData.measurements.filter((m) => m.type === 'heart_rate');
    const avgHR =
      hrMeasurements.reduce((sum, m) => sum + m.value, 0) / (hrMeasurements.length || 1);
    if (avgHR < 60 || avgHR > 100) score += 10;

    // High glucose
    const glucoseMeasurements = patientData.measurements.filter(
      (m) => m.type === 'glucose'
    );
    const avgGlucose =
      glucoseMeasurements.reduce((sum, m) => sum + m.value, 0) /
      (glucoseMeasurements.length || 1);
    if (avgGlucose > 180) score += 15;

    // Other factors
    if (patientData.age > 65) score += 5;

    return Math.min(score, 100);
  }

  /**
   * Get aggregated data with proper error handling
   */
  getAggregation(patientId: string): AggregationResult | null {
    try {
      return this.aggregatePatientData(patientId);
    } catch (error) {
      this.metrics.errors++;
      return null;
    }
  }

  /**
   * TODO: Implement incremental update
   * Instead of full recomputation, update only changed measurements
   */
  incrementalUpdate(patientId: string, newMeasurements: Measurement[]): void {
    // TODO: Implement logic to:
    // 1. Fetch current aggregation
    // 2. Calculate delta for new measurements
    // 3. Update aggregation incrementally
    // 4. Cache updated result
  }

  /**
   * TODO: Implement query optimization
   * Should support efficient querying across multiple patients
   */
  queryPatientsByRiskScore(minRisk: number, maxRisk: number): AggregationResult[] {
    // TODO: Implement efficient query
    // TODO: Use index/cache to avoid full scan
    // TODO: Consider pagination for large results
    const results: AggregationResult[] = [];

    for (const [patientId] of this.patients) {
      const agg = this.getAggregation(patientId);
      if (agg && agg.riskScore >= minRisk && agg.riskScore <= maxRisk) {
        results.push(agg);
      }
    }

    return results;
  }

  /**
   * Run cache cleanup and return metrics
   */
  getMetrics(): PipelineMetrics {
    const cacheMetrics = this.cache.getMetrics();
    return {
      ...this.metrics,
      cacheHits: cacheMetrics.hits,
      cacheMisses: cacheMetrics.misses,
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  /**
   * TODO: Implement memory estimation
   */
  private estimateMemoryUsage(): number {
    // TODO: Calculate approximate memory usage
    // Consider: patients map size, cache size, metrics
    return 0;
  }

  /**
   * TODO: Implement graceful shutdown with cleanup
   */
  shutdown(): void {
    // TODO: Clean up resources
    // TODO: Flush cache
    // TODO: Report final metrics
    this.cache.clear();
  }
}

/**
 * PART 3: ADVANCED REQUIREMENTS
 * 
 * Implement the following for senior-level expectations:
 * 
 * 1. Thread-safety/Race Condition Handling
 *    - Handle concurrent calls to addPatientData
 *    - Implement proper locking/queue mechanisms
 *    - Ensure data consistency
 * 
 * 2. Incremental Aggregation
 *    - Don't recalculate entire aggregation for small changes
 *    - Implement delta computation
 *    - Track which measurements have been processed
 * 
 * 3. Query Optimization
 *    - Implement indexes for common queries
 *    - Support efficient range queries
 *    - Consider time-series optimizations
 * 
 * 4. Observability
 *    - Implement logging/tracing
 *    - Track performance metrics
 *    - Support debugging of cache issues
 * 
 * 5. Error Handling & Resilience
 *    - Graceful degradation
 *    - Circuit breaker patterns
 *    - Retry logic with backoff
 * 
 * 6. Memory Management
 *    - Implement memory limits
 *    - Prevent memory leaks
 *    - Efficient data structures
 */

// TODO: Implement these advanced features for senior-level solution
