# Twelve-Factor App Methodology is now Open Source
###### 12 Nov, 2024
### [Yehuda Katz](https://github.com/wycats)
![Yehuda Katz](/images/bios/yehuda.jpg) **Join us in modernizing the twelve-factor app manifesto together.** As a community of app, framework and platform developers, we’re working together to refresh this foundational document for the modern era. While it’s not software we’re working on, we’ll use familiar processes like pull requests, issues, and reviews to collaborate together in the [twelve-factor project repo](https://github.com/twelve-factor/twelve-factor).

This initiative builds on a strong foundation laid by Heroku when they originally created "The Twelve-Factor App" all the way back in 2011, a time when container-based deployment was still just emerging. Back then, developers could get apps running on their local machines, but common development mistakes often made it challenging to deploy those apps to production.

The twelve-factor app started from a basic goal: you should be able to develop your app locally following your framework’s documentation and deploy it to production without tailoring it to a specific platform. To make this vision a reality, Twelve-Factor documented common pitfalls Heroku observed and organized them into a philosophy for building applications *designed* for deployment without *thinking* about deployment.

The philosophy of Twelve-Factor turned out to be surprisingly timeless. More than a decade later, people still find its insights valuable, and it’s often cited as a solid set of best practices for application development. But while the *concepts* remain relevant, many of the *details* have started to show their age.

Together with the community, we have begun an effort to refresh Twelve-Factor so people can apply its timeless concepts within the modern ecosystem. With Open Source governance, the refreshed Twelve-Factor will be a living document that evolves with the community, staying relevant as technology evolves.

It’s been exciting to see the interest from the broader community and the collaboration that's starting to take shape. Our initial call for participation brought so many folks to the conversation and we are honored to have an amazing initial set of [maintainers](/community) to kick off the project. Together we have been collaborating to define the project’s purpose and governance while taking the first steps to refine and modernize the principles. 

The Twelve-Factor community is excited to continue this work. Meet our [maintainers](/community) and hear from them on their excitement and interest in the project:

"The twelve-factor application definition was an early signpost on the direction of serverless and best practices for writing distributed applications. Twelve-Factor and the Heroku experience were key inspirations for Knative and Google Cloud Run, and I’m excited to be able to give back in updating these practices for the next generation of developers."  
– Evan Anderson (Independent)

"The twelve-factor principles captured a powerful simplicity that has influenced how we design applications for scalability and resilience. In updating these ideas, I’m focused on clarifying what makes a twelve-factor app distinct and effective in a cloud-native world, maintaining that balance between restriction and operational power. By doubling down on these boundaries, we can ensure the manifesto remains as impactful today as it was in its first chapter." – Vish Abrams (Chief Architect, Heroku)

“When I first encountered the twelve-factor application principles, it felt like a light bulb went off, and things clicked in my understanding of service development. These insights, drawn from both my own experience and the collective knowledge of others, have been instrumental in advancing system design in Intuit, as well as across the industry. I believe that, through collaboration with the community, we have a unique opportunity to shape the future of service and platform development for years to come.”  
–Brett Weaver (Distinguished Engineer, Intuit)

We’ll be sharing monthly updates on this blog about the changes we’re making as a community and what’s next for the project. You’ll also find analysis and discussion of the factors and software development more broadly. We plan to dive into trade-off discussions, explore Twelve-Factor from different perspectives, clarify the underlying principles we’re relying on, and provide case studies of twelve-factor implementations. The first analysis post is about [Narrow Conduits and the Application-Platform Interface](/blog/narrow-conduits).

Have an idea you’d like to share or discuss? Join us on [Discord](https://discord.gg/9HFMDMt95z) – we’d love to see you at an upcoming community meeting.