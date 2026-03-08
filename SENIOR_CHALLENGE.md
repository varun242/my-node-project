# Senior Engineering Challenge: Patient Data Pipeline

> Advanced system design and optimization interview problem for senior engineers at Cadence Care RPM

## 🎯 Overview

This challenge simulates a **real-world data processing system** that must handle high-volume patient data ingestion, complex analytics, and performance optimization. It tests senior-level skills in system design, performance optimization, and production concerns.

### Difficulty: **HARD** (for senior engineers)
- **Estimated time**: 60-90 minutes
- **Focus areas**: System design, performance, concurrency, resilience
- **Real-world application**: Data pipeline for remote patient monitoring

---

## 📊 Challenge Structure

### PART 1: Caching Layer & Performance (20-30 min)
**Focus: Data structures, performance optimization**

Implement an LRU (Least Recently Used) cache with TTL (Time To Live) support:

```typescript
export class DataCache<T> {
  // TODO: Implement LRU eviction policy
  get(key: string): T | null { }
  set(key: string, value: T): void { }
  cleanup(): number { }
}
```

**Key Requirements:**
- ✓ LRU eviction when capacity exceeded
- ✓ TTL expiration checking
- ✓ Metrics tracking (hits/misses/hitRate)
- ✓ Efficient cleanup of expired entries
- ✓ Memory limit enforcement

**Test Status:**
- 9 test cases (varies from basic to edge cases)
- Currently: 0 passing

### PART 2: Data Aggregation & Optimization (25-35 min)
**Focus: Algorithmic thinking, caching strategy**

Implement a data pipeline with intelligent caching:

```typescript
export class PatientDataPipeline {
  // TODO: Implement with caching and optimization
  addPatientData(patientData: PatientData): void { }
  batchAddPatientData(patientDataList: PatientData[]): void { }
  aggregatePatientData(patientId: string): AggregationResult { }
  incrementalUpdate(patientId: string, newMeasurements: Measurement[]): void { }
  queryPatientsByRiskScore(minRisk: number, maxRisk: number): AggregationResult[] { }
}
```

**Key Requirements:**
- ✓ Avoid recomputation when data unchanged
- ✓ Intelligent caching strategy
- ✓ Batch processing optimization
- ✓ Efficient aggregation algorithms
- ✓ Risk scoring based on multiple factors
- ✓ Query optimization with indexes

**Test Status:**
- 15 test cases (basic, caching, batch, risk, query, errors)
- Currently: 0 passing

### PART 3: Advanced Challenges (15-25 min)
**Focus: Production-ready code**

Implement advanced features for production systems:

1. **Thread-safety & Concurrency**
   - Handle concurrent `addPatientData()` calls
   - Prevent race conditions
   - Ensure data consistency

2. **Incremental Aggregation**
   - Delta computation for partial updates
   - Avoid full recalculation
   - Track processed measurements

3. **Query Optimization**
   - Index support for range queries
   - Time-series optimizations
   - Efficient pagination

4. **Observability & Monitoring**
   - Comprehensive logging
   - Performance metrics
   - Debug tracing

5. **Error Handling & Resilience**
   - Circuit breaker pattern
   - Retry logic with backoff
   - Graceful degradation

6. **Memory Management**
   - Memory limit enforcement
   - Leak prevention
   - Efficient cleanup

**Test Status:**
- 6 advanced test cases
- Currently: Placeholder tests (ready for implementation)

---

## 📈 System Architecture Decisions

### Why LRU Cache?
- **Trade-off**: Memory efficiency vs. retrieval speed
- **Alternative**: TTL-only cache (simpler but less memory efficient)
- **Production use**: Prevents memory bloat from old entries

### Why Incremental Updates?
- **Problem**: Full recalculation is expensive
- **Solution**: Only update changed measurements
- **Trade-off**: More complex code, but better performance

### Why Batch Operations?
- **Problem**: Processing one patient at a time is slow
- **Solution**: Batch process multiple patients
- **Trade-off**: More complex error handling

---

## 🏗️ Problem Progression

```
Start: Understanding Requirements (5 min)
  ↓
Part 1: Implement DataCache (20-30 min)
  - Basic get/set
  - LRU eviction
  - TTL expiration
  - Cleanup & metrics
  ↓
Part 2: Implement PatientDataPipeline (25-35 min)
  - Basic aggregation
  - Caching integration
  - Batch operations
  - Query optimization
  ↓
Part 3: Advanced Features (15-25 min)
  - Concurrency handling
  - Incremental updates
  - Performance optimization
  - Production concerns
  ↓
Final: Verify all tests pass (5 min)
```

---

## 🧪 Test Coverage

### PART 1: DataCache Tests (9 tests)
```
✓ Basic Operations (3 tests)
✓ LRU Eviction Policy (3 tests)
✓ TTL Expiration (2 tests)
✓ Cleanup Operations (2 tests)
✓ Edge Cases (2 tests)
```

### PART 2: PatientDataPipeline Tests (15 tests)
```
✓ Basic Aggregation (3 tests)
✓ Caching & Performance (2 tests)
✓ Batch Operations (2 tests)
✓ Risk Scoring (4 tests)
✓ Query Operations (2 tests)
✓ Error Handling (2 tests)
✓ Metrics & Observability (3 tests)
✓ Resource Cleanup (1 test)
```

### PART 3: Advanced Tests (6 tests)
```
✓ Thread-safety
✓ Incremental Aggregation
✓ Query Indexes
✓ Circuit Breaker
✓ Memory Limits
✓ Distributed Tracing
```

---

## 💡 Interview Tips

### Before You Start
1. **Understand the requirements** - Read all comments carefully
2. **Ask clarifying questions**
   - "What's the expected data volume?"
   - "How frequently is data queried vs. updated?"
   - "What are the latency requirements?"
3. **Plan your approach** - Sketch system architecture on whiteboard

### During Implementation
1. **Start simple** - Get basic functionality working first
2. **Test incrementally** - Run tests after each feature
3. **Explain your decisions** - Why this data structure? Why this algorithm?
4. **Consider trade-offs**
   - Memory vs. Speed
   - Complexity vs. Performance
   - Consistency vs. Availability

### When Stuck
1. **Review test expectations** - Tests show required behavior
2. **Check the comments** - Hints are in the TODOs
3. **Think about edge cases** - What if data is empty? What if cache is full?
4. **Don't over-engineer** - Start with simple solution, optimize if needed

### When Done
1. **Verify all tests pass** - `npm test`
2. **Review code quality** - Clean, readable, well-commented
3. **Check performance** - Any obvious bottlenecks?
4. **Think about production** - Error handling? Logging? Monitoring?

---

## 🎓 What This Tests

### System Design
- ✓ Data structure choices
- ✓ Algorithm selection
- ✓ Performance optimization
- ✓ Scalability considerations

### Code Quality
- ✓ Clean, readable code
- ✓ Proper error handling
- ✓ TypeScript best practices
- ✓ Testing mindset

### Senior-Level Thinking
- ✓ Production concerns (observability, monitoring)
- ✓ Resilience (error handling, graceful degradation)
- ✓ Performance (caching, batching, indexes)
- ✓ Concurrency (thread-safety, race conditions)
- ✓ Trade-off analysis
- ✓ Scalability

---

## 📚 Key Concepts

### LRU Cache
```
When cache is full and new item added:
1. Remove least recently used item
2. Add new item to cache
3. Update access order for remaining items
```

### TTL (Time To Live)
```
When retrieving item:
1. Check if current time > expiration time
2. If expired, treat as cache miss (not found)
3. If not expired, treat as cache hit (return data)
```

### Incremental Aggregation
```
Instead of:
  recalculate_all(patientData)

Do:
  current_agg = get_cached(patientId)
  delta = calculate_delta(new_measurements)
  new_agg = update_agg(current_agg, delta)
  cache_update(patientId, new_agg)
```

### Risk Scoring
```
risk_score = 0
if heart_rate < 60 or > 100: risk_score += 10
if glucose > 180: risk_score += 15
if age > 65: risk_score += 5
return min(risk_score, 100)
```

---

## 🚀 Running the Tests

```bash
# Run all tests
npm test

# Run only senior challenge tests
npm test -- patientDataPipeline.spec.ts

# Run specific test suite
npm test -- --testNamePattern="DataCache"

# Run with coverage
npm test -- --coverage

# Watch mode (auto-rerun on changes)
npm test -- --watch
```

---

## 📊 Complexity Analysis

### DataCache
- **get()**: O(1) average case (Map lookup)
- **set()**: O(1) amortized (with LRU eviction)
- **cleanup()**: O(n) where n = cache size

### PatientDataPipeline
- **addPatientData()**: O(m) where m = number of measurements
- **aggregatePatientData()**: O(m) for first aggregation, O(1) for cached
- **queryPatientsByRiskScore()**: O(n) where n = number of patients

---

## 🏆 Success Criteria

- ✅ All Part 1 tests passing (LRU & TTL working)
- ✅ All Part 2 tests passing (aggregation & caching working)
- ✅ Part 3 advanced features implemented
- ✅ Code compiles without errors
- ✅ No TypeScript errors or warnings
- ✅ Tests run successfully
- ✅ Can explain your design decisions

---

## 📝 Interview Follow-ups

After completing the challenge, be ready to discuss:

1. **Scalability**: How would this work with 1 million patients?
2. **Persistence**: How would you add database support?
3. **Distribution**: How would you run this across multiple servers?
4. **Real-time**: How would you handle real-time data streaming?
5. **Testing**: How would you test concurrent access?
6. **Monitoring**: How would you monitor cache hit rates in production?

---

## 🎯 Good Luck!

Remember:
- This is a realistic problem you might encounter at Cadence
- Focus on clear, working code first, optimization second
- Explain your thinking process aloud
- Ask clarifying questions
- Show your problem-solving approach

**You've got this! 🚀**
