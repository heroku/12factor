---
title: Why Intuit is Thrilled About the Evolution of the Twelve-Factor Model
date: 2025-04-03
author: brett
featured: true
---

At Intuit, we've long embraced the twelve-factor app principles as a guiding
framework for modern software development. As a company building cutting-edge
development tools and runtime platforms for our internal engineers, these
principles have been instrumental in unifying service developers, platform
engineers, and SREs under a shared philosophy.

<!-- END_EXCERPT -->

By fostering a universal understanding across teams, we've eliminated friction
between services, platforms, and dependencies. Concepts like running
applications as stateless processes aren't up for debate anymore—they’re simply
ingrained in how we build.

In this article, we’ll take you behind the scenes of our internal platform,
explore how we've expanded on the twelve-factor model with our own **Intuit
Factors**, and dive into our open-source contributions that are helping shape
the future of cloud-native development.

## The Benefits of an Internal Platform

Over the past decade, Intuit has built an internal developer platform that
streamlines the software development lifecycle, leveraging open-source
technologies and aligning with our strategic goals. This platform is
intentionally opinionated, giving us a competitive edge by standardizing how
thousands of developers build, deploy, and operate services.

At its core, our developer platform is engineered around the twelve-factor
principles, including:

- **Stateless workloads** – Every workload runs statelessly, with pods
  responding properly to shutdown signals, validated throughout the service
  lifecycle.
- **Separation of configuration** – Configurations are decoupled from
  deployments and managed through our configuration service or environment
  variables.
- **Decoupled dependencies** – Services operate in fully isolated environments.
  Our Kubernetes runtime, for example, is hosted in its own AWS account and
  VPC, with externalized dependencies separated into another VPC.

## Beyond the 12 Factors \- The Intuit Factors

As technology has advanced, we’ve identified key areas where the **twelve-factor
model** does not cover all the specific requirements of Intuit’s modern cloud
platform. That’s why we’ve introduced our own **Intuit Factors**—a superset of
the original factors, specific to Intuit that enhance security, observability,
and developer experience specific to Intuit.

These are factors which are unique to us (e.g. we have a factor which states
you must leverage Intuit approved sensitive data management services and
integrate with our API Gateway and leverage Intuit AuthN / AuthZ providers)

## Evolving the 12 Factors \- Workload Identity

While many factors we created are specific to Intuit, some of these are generic
which we are working to support inclusion into the 12 factors update. For
example, we believe that workload identity is necessary for a 12 factor app.

Workload identity refers to the unique identity and associated attributes
assigned to a workload—such as a container, virtual machine, or serverless
function enabling it to authenticate and interact securely with other services
and resources within a computing platform. Unlike user identities, which are
tied to human operators, workload identities are managed dynamically by the
platform and serve to establish trust between workloads and external services
without relying on static credentials.

From a technical perspective, workload identity typically includes:

- **Unique Identifiers** \- Platform generated attributes like instance IDs,
  pod service accounts, or unique workload names.
- **Authentication Mechanisms** \- Cryptographic credentials, OAuth tokens, or
  signed requests used to prove the identity.
- **Authorization Policies** \- Role based access controls (RBAC) or attribute
  based policies that define what the workload can access.
- **Lifecycle Management** \- Automated provisioning, rotation, and revocation
  of credentials to minimize security risks.

In our implementation, we leverage IRSA (IAM Roles for Service Accounts)
alongside our runtime configuration service. This delivers just-in-time, short
lived credentials, configuration, and policy to the given workload which is
tied to the specific workload's role. As we work with the community, we’d like
to shape the definition of workload identity as a future factor.

## Driving Open-Source Innovation

At Intuit, we believe in giving back to the developer community, which is why
we've played a key role in advancing the **Argo ecosystem**. Our contributions
ensure that Argo products align seamlessly with **twelve-factor principles**,
enabling developers to adopt cloud-native best practices effortlessly.

For example, **ArgoCD** treats git as the **single source of truth** for
application configuration, this enforces consistency across environments
(**Dev/Prod Parity**) deploying a **single codebase** and cleanly separates
configuration from code (**Config**). Workloads deployed via ArgoCD remain
**stateless and scalable**, leveraging Kubernetes-native tools for process
management and concurrency, treading processes as **disposable**.

Moreover, ArgoCD’s **declarative approach** and seamless **CI/CD integration**
streamline the entire build, release, and run workflow—reinforcing twelve-factor
principles while embracing modern cloud-native development.

## The Future of 12-Factor at Intuit

As we continue refining our internal platform and contributing to open-source
projects, Intuit remains committed to **advancing the future of cloud-native
development**.

The **original 12 factors** transformed the way software is built and deployed.
Now, with the next iteration on the horizon, we believe even greater innovation
lies ahead—for developers, for organizations, and for the industry as a whole.

**Stay tuned—this journey is just getting started.** 🚀
