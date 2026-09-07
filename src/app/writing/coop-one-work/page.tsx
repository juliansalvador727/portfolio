import Link from "next/link";

export default function CoopOneWork() {
  return (
    <main>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Co-op One: Work</h1>
          <span className="text-muted-foreground text-sm">Sep 2026</span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            This is the first part of a two part series on my first co-op. This
            part is about the work: what I built and what I&apos;m doing next.
            The second part is about living in and travelling around Europe.
          </p>
          <p>
            For my first co-op I worked in Stuttgart, Germany, at the German
            Aerospace Center (DLR), Institute of Vehicle Concepts. I earned an
            outstanding rating. Here&apos;s what the work was and how I did it.
          </p>
          <p>
            Euro 7 is the seventh set of European regulations on vehicle
            emissions. It&apos;s the first to set a hard limit on non-exhaust
            emissions, meaning the particles that come off tires and brakes
            rather than out of the tailpipe. Measuring those in a standardized
            way is still an open problem. The regulations take effect in
            November 2026, and my institute was working on them ahead of that
            deadline.
          </p>
          <p>
            The question we were trying to answer: how do you measure particle
            emissions from both ambient and mobile data sources? The main intern
            project was a website visualizing particle emissions from a moving
            vehicle and a fixed sensor location, built to demonstrate our
            approach internally and to project partners.
          </p>
          <p>
            My two supervisors, both master&apos;s/PhD researchers, were busy
            with other projects, so I had a lot of freedom in how to solve it. I
            worked alongside another intern, so most of this was a team effort.
          </p>
          <p>
            Our first implementation used deck.gl, 3D animations, and CSV/GLB
            files, built around smooth scrolling and heavy visuals. It
            demonstrated the solution but never made the use cases clear, so we
            went back to the drawing board and presented the same visualizations
            more simply.
          </p>
          <p>
            Around this time my supervisors started trusting me with other work.
            I got most interested in the data pipeline from car to cloud.
          </p>
          <p>
            The first side project was a Raspberry Pi 4 human machine interface
            (HMI): a dashboard mounted in the research vehicle&apos;s cup
            holder. It published and subscribed to two MQTT topics, one for
            telemetry and one for commands, and let the test driver start and
            stop collection from the sensor node.
          </p>
          <p>
            This was a necessity. The sampling hardware is sensitive to weather,
            and the driver needed a way to protect it mid-drive without ending
            the run.
          </p>
          <p>
            The HMI also showed live sensor readings from the node during the
            drive. I tested this myself on the autobahn in Stuttgart.
            Accelerating hard to 150km/h or braking at a stop sign moved the
            readings immediately.
          </p>
          <p>
            Field hardware has to survive weather and patchy coverage, so I
            wrote a reconnection watchdog that handled dropouts and unclean
            shutdowns. Running an ethernet cable wasn&apos;t possible without
            heavily modifying the setup, so everything had to work over
            cellular.
          </p>
          <p>
            I&apos;m proud of this one. By the end of my internship the HMI had
            been field tested over thousands of kilometres and hundreds of
            driving hours. It let the researchers collect far more observations,
            and it kept the hardware out of trouble more than once.
          </p>
          <p>
            The second side project was hardware. My supervisor wanted the
            existing Arduino/PlatformIO code ported to Zephyr RTOS. It took much
            longer than expected. I finished working code, but between hardware
            issues and limited time on the bench it was only half done: it
            worked in software, but there wasn&apos;t time to validate it on
            hardware before I left.
          </p>
          <p>
            I learned a lot of Zephyr along the way, including the device tree,
            config, and the T2 workspace layout. I wouldn&apos;t say I have it
            down. I just learned it, and it was a great experience.
          </p>
          <p>
            The third project was a set of Grafana plugins for the researchers:
            a 3D hexagonal drive heatmap, a 3D ambient emissions heatmap, a
            particle size distribution graph, a 3D version of that graph, and a
            drive selector.
          </p>
          <p>
            The hard part was supporting two InfluxDB versions at once. Every
            plugin had to be modular: fields and buckets differ between 1.x and
            2.x, and 1.x uses InfluxQL while 2.x uses Flux, so the same data
            arrives at the plugin in different shapes. On top of that, the
            plugins had to read time series data and stay flexible about which
            fields they took in.
          </p>
          <p>
            The 3D hexagonal heatmap showed this best. Mostly the researchers
            wanted readings from the vehicle plotted over position and time. But
            they also wanted the same drive against vehicle speed, battery state
            of charge, and my favorite, cellular signal across the route.
          </p>
          <p>
            The position data was precise enough to follow the exact path of a
            drive. You could also watch the network drop out, with clear
            coverage gaps along the route. This heatmap became the lead visual
            for the project.
          </p>
          <p>
            It was useful to the researchers too. Without the size distribution
            graph they had to parse values by hand and write a MATLAB script for
            a basic plot. With it they could read results live during testing
            and reach conclusions faster.
          </p>
          <p>
            The fourth and last side project was a CAN bus signal parser
            handling 11-bit and 29-bit IDs, extending an existing parser. I
            learned to read standard OBD-II messages on one vehicle, then
            applied the same approach to another.
          </p>
          <p>
            This was my favorite part of the internship. It felt like everything
            else had led up to it, because the signals fed straight into the
            pipeline I&apos;d spent months improving. Adding vehicle speed to
            the parseable signals meant it moved through the I2C Zephyr sensor
            bus I built, appeared on the Pi HMI, and showed up as a new option
            in every Grafana plugin I&apos;d written.
          </p>
          <p>
            I also got to field test a second vehicle, which was a nice change
            of pace.
          </p>
          <p>
            By August, with the side projects done, the main intern project came
            together. We&apos;d been through several iterations of the landing
            page and the overall design, and settled on something minimal that
            explained the solution, the story behind it, and what we offered,
            without burying the visualizations under Grafana dashboards and
            technical detail.
          </p>
          <p>
            Two moments stand out. The first was shooting b-roll of the vehicle.
            The other intern has a gimbal and a good camera, and we&apos;d been
            joking at work about how nice it would be to have real footage of
            the car for the site. We asked our supervisors and they were
            immediately on board. We planned the scenes ahead of time:
            close-ups, drivebys, and shots of someone using the HMI.
          </p>
          <p>
            The second was a script I wrote to cut page latency. The site had
            heavy CSV and GLB animations, so I stepped through the deck.gl
            animations, screenshotted each frame, and stitched the PNGs into a
            seamless video with ffmpeg. It cut load time and page size, and it
            meant the site didn&apos;t have to serve the large 3D asset or our
            raw CSV data. I later reused the technique to speed up the UWHPC
            loading animation.
          </p>
          <p>
            All in all it was a fulfilling internship. All of my co-workers
            spoke fluent English, and I&apos;ll miss the outings to Pforzheim
            and the beach volleyball.
          </p>
          <p>
            My supervisor offered me a return and said I was welcome to come
            back. I turned it down for two reasons. The first is practical: I
            can&apos;t get a second Youth Mobility Visa for Germany. The second
            is money. The compensation covered living costs in Stuttgart, but
            there wasn&apos;t enough left over to save for next term or put
            toward tuition. So I&apos;m looking in Canada for my next co-op.
          </p>
          <p>
            The work itself gave me one of the best experiences I could have
            asked for: breadth and depth across hardware, firmware, fullstack,
            infra, a bit of ML, and a lot of hands-on testing, deployment, and
            system design.
          </p>
        </div>
        <Link href="/writing" className="underline text-sm">
          ← back
        </Link>
      </div>
    </main>
  );
}
