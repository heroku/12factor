# Evolving Twelve-Factor: Applications to Modern Cloud-Native Platforms
###### 10 Feb, 2024
### [Brian Hammons](https://github.com/bhammons)
![Brian Hammons](/images/bios/brian.jpg) The recent [**open sourcing of the Twelve-Factor App Methodology**](https://blog.heroku.com/heroku-open-sources-twelve-factor-app-definition) comes at a transformative moment for cloud-native platforms. As organizations increasingly rely on cloud-native technologies to power mission-critical workloads, the principles behind Twelve-Factor offer timeless foundations that remain relevant for modern platform builders.

As Gail Frederick, CTO at Heroku, noted in a recent [interview with The New Stack](https://thenewstack.io/heroku-moved-twelve-factor-apps-to-open-source-whats-next/), “the principles were primarily created to help developers develop their applications locally and package it portably across cloud providers, then have it be able to run resiliently and have it be a delightful experience to build that." This vision of developer empowerment coupled with operational excellence remains as relevant today as when Twelve-Factor was first introduced.

However, the landscape has evolved significantly since Twelve-Factor's initial release. The rise of containers, Kubernetes, and cloud-native architectures has introduced new complexities that the original methodology couldn't have anticipated. Modern platform builders must now balance the timeless principles of Twelve-Factor with emerging patterns in cloud-native development, security, and operations.

This convergence of established methodology and modern practice offers an opportunity for the cloud-native community. Through open source collaboration, the Twelve-Factor modernization initiative seeks to evolve these principles to better serve today's developers while maintaining the operational rigor that made Twelve-Factor so influential in the first place.

## Historical Context and Evolution

As Kelsey Hightower stated in 2017, [Kubernetes is a platform for building platforms](https://www.opensourcerers.org/2021/12/06/kubernetes-is-a-platform-for-building-platforms/). But as platform evolution progresses, what are developers losing in the tradeoff? The modern cloud-native journey has been marked by distinct eras of innovation and challenges, and it is helpful to examine this history to better understand its implications and define a meaningful pathway forward.

**Pre-Cloud Era (Early 2000s):** The concept of the full-stack developer flourished during this period. These early innovators managed entire application stacks, enjoying the benefits of direct control over code and infrastructure. They made use of simpler deployment stacks such as LAMP and frameworks like Rails to create apps. The famous "rails new demo" command exemplified the streamlined developer experience of the time, though it came with limitations in scale and complexity.

**DevOps Revolution (Late 2000s):** The emergence of infrastructure automation and configuration management tools promised to improve deployment velocity and reliability. However, this evolution came with a cost: developers now needed to maintain automation pipelines alongside their application code, transforming many into reluctant DevOps engineers.

**Modern Cloud Era (2000s \- 2010s):** After observing developers increasingly losing time to “undifferentiated heavy lifting” and infrastructure concerns, Heroku introduced the Twelve-Factor App methodology in 2011 as a way to help developers avoid common pitfalls in cloud deployment and to offer standardized practices for successfully building cloud-native applications.

**Container Revolution (Mid 2010s):** Docker’s introduction in 2013 and Kubernetes’ subsequent emergence revolutionized how applications are deployed in the cloud. Kubernetes, in particular, quickly became the standard for container orchestration and led to the establishment of the Cloud Native Computing Foundation (CNCF) in 2015 which has since grown to support a vast array of open source projects. Albeit remarkable in terms of innovation, the increased cognitive load on both development and engineering teams has added operational complexity and created new challenges while overshadowing any remnants of full-stack simplicity.

## Addressing Modern Challenges with Twelve-Factor

The evolution of cloud-native technologies has introduced new complexities that the original Twelve-Factor methodology couldn't have anticipated. Modern platforms have adopted practices such as “shift left” to better address this increased complexity:

### Tackling the "Shift Left" Challenge

The "shift left" movement aims to integrate quality and security earlier in the development cycle. While well-intentioned, this often increases cognitive load on developers and introduces points of friction between developers and platform teams.

Twelve-Factor can help balance "shift left" considerations and still enable such modern DevOps benefits through:

* **Clear Role Definition**: Separating platform concerns from the application layer allows developers to focus on business logic and operators to manage infrastructure complexity.  
* **Balanced Responsibility Model**:  
  * *Traditional Shift-Left Approach*: Developers handle application code, infrastructure, security scanning, deployment configuration, and monitoring setup.  
  * *Twelve-Factor Approach*: Developers focus on application code, business logic, and clear interfaces. The platform provides infrastructure abstraction, security controls, deployment automation, and observability by default.  
* **GitOps Integration**: While GitOps appears to be another "shift left" practice, Twelve-Factor principles help it become an enabler rather than a burden. Twelve-Factor supports GitOps practices by proposing methods for clean separation of codebase and config, enabling environment-specific settings, providing clear handoffs between build, release, and run stages, supporting declarative configurations, and promoting automated deployments.  
* **Reducing Cognitive Load**: Platforms can automate dependency management, security scanning, deployment pipelines, and infrastructure provisioning to better enable developers to concentrate on their code. Abstracted capabilities such as service discovery, configuration management, out of the box logging and monitoring, and scaling controls can greatly accelerate developer productivity.

## Key Benefits for Platform Builders

Modern platform builders implementing Twelve-Factor principles can realize significant advantages while supporting both developer productivity and operational excellence:

* **Bridging the Dev-Ops Divide**: Twelve-Factor provides a framework for deploying applications that serve both developers and operations teams effectively. Successful platforms must avoid catering to one group at the expense of the other. The methodology offers guidance that can help platform builders create abstractions that hide complexity from developers, create automated workflows that satisfy both groups’ needs, balance control with flexibility, and implement a shared responsibility model that works in practice. All this can be achieved while still ensuring operational excellence, heightened security, and reliability.  
* **Clear Separation of Concerns**: The methodology's practical guidance offers a proven model for organizing capabilities such as:  
  * Distinct separation of codebase, config, and build/release/run stages  
  * Support for multiple environments without code changes  
  * Consistent deployment patterns across the organization  
  * Clear boundaries between application and infrastructure concerns  
  * Standardized approaches to common challenges  
* **Standardized Interface Design**: Twelve-Factor's principles around port binding, backing services, and process management offers platform builders patterns for designing consistent and clear interfaces. This standardization enables service discovery and composition, clear protocols for backing service connections, logging and monitoring interfaces, and portable workload definitions.  
* **Alignment with Modern Cloud-Native Patterns**: Twelve-Factor principles naturally align with modern cloud-native architectures, and can be applied to use cases such as containerization, config management, and orchestration. For instance, stateless processes map to container-based deployments, config separation supports Kubernetes ConfigMaps, and process management is consistent with cloud-native orchestration practices.  
* **Enhancing Developer Experience**: Twelve-Factor improves developer productivity by simplifying application onboarding, emphasizing consistent development-to-production parity, and enabling self-service capabilities. Consistent with the original goals of Twelve-Factor, the maintainers of the modernization initiative are focused on improving the developer experience of modern developers building cloud-native apps.

## Practical Implementation Guidance

For platform teams hosting modern cloud infrastructure for app developers:

* **Abstract Infrastructure Complexity**: Provide higher-level abstractions focused on applications, and hide underlying implementation details as much as possible including Kubernetes YAML and infrastructure components. Enhancing self-service capabilities, implementing intuitive search and discovery, and automation of routing tasks can help developers operate efficiently without managing infrastructure complexity.  
* **Standardize Deployment Patterns**: Implement consistent build, release, and run stages with support for declarative configurations. Enable automated pipeline creation, ensure reproducible deployments, and maintain secure isolation and granular access throughout the process.  
* **Maintain Operational Control**: Support development teams with standardized logging and monitoring capabilities out of the box. Provide clear troubleshooting capabilities, and sensible telemetry to enhance workload visibility and resilience. This will reduce the time it takes to uncover and diagnose problems, improving metrics such as MTTD and MTTR and the ability to maintain a high level of operational excellence. At the same time, platform teams maintain access to the underlying infrastructure APIs and are able to support audit and compliance requirements.  
* **Prioritize Developer Workflows**: Create simple and intuitive onboarding experiences, ensure development environments match production, and provide clear documentation and examples. This will enhance developers ability to operate efficiently and remain productive.

## Looking Forward: The Future of Twelve-Factor

The open-sourcing of Twelve-Factor creates new opportunities for community-driven innovation. As we look ahead, several key areas show particular promise:

* **Enhanced Observability:** Integration with OpenTelemetry can provide deeper insights into application behavior and performance. This standardized approach to telemetry data collection and transmission will enable better monitoring, troubleshooting, and optimization across distributed systems.  
* **Security and Compliance Evolution:** Automated security controls and validations are becoming increasingly sophisticated. Modern platforms can enforce security policies, manage secrets, and ensure compliance requirements are met consistently across all applications and environments. Given the lack of explicit inclusion in the original manifesto, the Twelve-Factor team has proposed a new factor, [Identity](https://github.com/twelve-factor/twelve-factor/issues/9), and are currently seeking feedback on its inclusion.

## Conclusion

As platform engineering continues to evolve, Twelve-Factor provides enduring principles for building developer-friendly yet operationally sound platforms. The methodology's open-sourcing marks a new chapter in its evolution, creating opportunities for the cloud-native community to adapt these principles for modern architectures while maintaining their original intent.

The challenges facing technology teams have grown in complexity and risk, increasing cognitive load on developers and constraining their productivity. However, by modernizing Twelve-Factor to better align with present-day cloud-native principles, platform builders can deliver capabilities and experiences that increase developer productivity while maintaining the operational control needed in modern cloud environments.

### Get Involved

The Twelve-Factor approach to software development has inspired architecture and development practices for more than a decade. Its principles define a unified, predictable way to make enterprise systems safer to deploy and easier to maintain. Now, through open source collaboration, we have the opportunity to evolve these principles to better serve today's developers while maintaining the operational rigor that made Twelve-Factor so influential in the first place.

We invite you to join the community and contribute to the next generation of cloud-native platform development. Visit our [GitHub repository](https://github.com/twelve-factor/twelve-factor) to learn more about how you can participate in shaping the future of Twelve-Factor methodology.

