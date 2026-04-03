# Lessons from Operating S3: Designing for Failure at Scale

Every system will fail. The question is whether you designed it to fail gracefully or catastrophically.

After leading multiple teams across AWS S3's core infrastructure — including load balancing, cellular architecture, and data integrity — I've developed a deep appreciation for what it means to build systems that operate reliably at exabyte scale. Here are the lessons that have stayed with me.

## Lesson 1: Assume Failure, Always

At S3's scale, failure isn't a rare edge case — it's a constant background condition. Disks fail. Networks partition. Software has bugs. Entire availability zones can experience disruption.

The engineers who designed S3's foundational architecture didn't ask "how do we prevent failures?" They asked "how do we continue operating correctly when failures occur?" This is a fundamentally different design philosophy, and it changes everything about how you build.

Design your systems to degrade gracefully. Define what "good enough" looks like when things go wrong. Know which operations are safe to retry, which are idempotent, and which require careful coordination to avoid double-execution.

## Lesson 2: Cellular Architecture Is a Superpower

One of the most powerful ideas I encountered at S3 is the cellular architecture pattern. The core insight is simple: instead of building one large system, build many small, independent cells that each serve a subset of traffic.

When a cell experiences a problem, the blast radius is contained. You're not debugging an incident affecting all customers — you're debugging one cell. You can route around degraded cells. You can roll out changes to one cell at a time. You can experiment safely.

The cost is coordination complexity and duplication. The benefit is predictable, bounded failure modes. At scale, this tradeoff is almost always worth it.

## Lesson 3: Data Integrity Is Non-Negotiable

When customers store data in S3, they're extending a fundamental trust: that the bits they put in are the bits they'll get back. Violating this trust — even once — is catastrophic in a way that a performance regression or even an availability incident is not.

This means data integrity checks need to be built into the system at every layer, not bolted on afterward. Checksums on write. Verification on read. Regular scrubbing to detect silent corruption. Defense in depth, because any single layer can fail.

The lesson I carry: for systems that store or process data customers care about, treat integrity as a first-class requirement from day one. It is far harder to retrofit than to build in.

## Lesson 4: Operational Excellence Is a Feature

In the early days of my career, I thought of operations as something separate from engineering — the unglamorous work that happened after the real work of building was done. S3 taught me this framing is wrong.

How a system behaves at 3am, when something goes wrong and an on-call engineer is trying to understand what's happening — that's a product experience too. The quality of your runbooks, the clarity of your metrics, the actionability of your alarms: these are engineering decisions that deserve the same rigor as your data model or your API design.

The best teams I've worked on treated operational excellence as a feature, not a tax. They invested in observability before incidents, not after. They wrote runbooks as part of the launch checklist. They measured and improved their time-to-detect and time-to-mitigate as seriously as they measured latency.

## Lesson 5: Scale Changes Everything

Intuitions that hold at small scale break at large scale. An operation that takes 1ms becomes a bottleneck when called a billion times a day. A hash collision that's theoretically possible becomes a near-certainty when you're processing enough data. A configuration change that's safe to push to one server is terrifying to push to ten thousand simultaneously.

The most important skill for engineers working on large-scale systems is the ability to reason about probability and statistics. Rare events become common. Tail latencies matter. What's true on average often isn't true in the tails.

If you're moving to a role working on large-scale systems, develop your intuition for orders of magnitude. Know what a million, a billion, and a trillion look like. Learn to think about your system's behavior not just under normal load, but at 10x and 100x.

## Closing Thought

The principles that make S3 reliable — assume failure, contain blast radius, protect data integrity, invest in operations, respect scale — aren't unique to object storage. They apply to any system that needs to be dependable. The specifics differ, but the philosophy translates.

Build like something will go wrong. Because it will.
