# Evidence Atlas Lab

## SOC 2 Evidence & Control Testing Simulation

Evidence Atlas Lab is a browser-local, interactive GRC simulation for practicing evidence-based control testing. The learner acts as a control tester for a fictional healthcare platform preparing for a SOC 2 Type II readiness review.

The lab is intentionally practical: the learner opens synthetic artifacts, distinguishes policy intent from operating evidence, maps artifacts to sampled controls, chooses an effectiveness conclusion, scores the defensibility of the call, and documents a remediation finding.

> This is a training simulation. It is not a SOC 2 report, an audit opinion, a compliance certification, or a substitute for an independent audit.

## What the learner does

The first scenario contains five synthetic evidence artifacts and four sampled controls inspired by the Security and Availability criteria of the AICPA Trust Services Criteria. The learner must:

1. Read the Northstar Health case brief and understand the audit period.
2. Open the Evidence Vault and inspect artifact age, type, scope, and analyst summary.
3. Review the Control Matrix and trace each control to its linked evidence.
4. Select **Effective**, **Partially effective**, or **Ineffective** for each control.
5. Receive a score based on whether the conclusion is defensible against the reference rationale.
6. Write a risk finding, assign a remediation owner, and commit it to the local case timeline.

The experience is designed around a core GRC distinction: a policy can demonstrate control design, but it does not by itself prove that the control operated effectively during the audit period.

## Scenario map

| Control | Scenario signal | Reference conclusion |
| --- | --- | --- |
| CC6.1 — Logical access controls | Two privileged break-glass identities are active without MFA. | Partially effective |
| CC6.7 — Transmission and storage protection | Production PostgreSQL clusters report encryption at rest. | Effective |
| CC7.2 — Anomaly and event monitoring | Central logging is absent from the `eu-west-1` production region. | Ineffective |
| CC7.4 — Recovery and continuity testing | The only restore exercise predates the current quarterly cadence and RTO. | Ineffective |

## Safety boundaries

The lab contains fictional Northstar Health data only. It does not call AWS, Azure, GitHub, customer systems, or external URLs. It does not ask for credentials, upload files, create findings in a real system, or perform cloud changes. Session state is held in React memory and is discarded on refresh.

## Stack

The application is a small React and TypeScript frontend built with Vite. The UI uses Lucide icons, CSS design tokens, responsive CSS, and no backend dependency. It is suitable for a static deployment or local portfolio demonstration.

## Run locally

```bash
pnpm install
pnpm run check
pnpm run build
pnpm run dev
```

Open the local URL printed by Vite. No cloud account, API key, database, or environment variable is required.

## Portfolio value

This project demonstrates practical judgment in evidence review, control testing, risk communication, and remediation planning. It complements a cloud evidence collection script by showing what an analyst does after evidence has been collected: determine whether the evidence supports an assertion and explain what remains unresolved.

## Framework references

The scenario is an educational interpretation of publicly available control concepts. The implementation should not be read as an official mapping or complete criteria set.

- [AICPA — Trust Services Criteria](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
- [AICPA — SOC Suite of Services](https://www.aicpa-cima.com/resources/download/aicpa-soc-suite-of-services)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)

## License

MIT. See [LICENSE](LICENSE).
