"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const FoodMap = dynamic(() => import("@/components/food-map"), { ssr: false });

const tiers = [
  {
    label: "S",
    color: "bg-red-500",
    items: ["ECE 124"],
  },
  {
    label: "A",
    color: "bg-orange-400",
    items: ["ECE 192", "MATH 119"],
  },
  {
    label: "B",
    color: "bg-yellow-400",
    items: ["ECE 140", "ECE 106"],
  },
  {
    label: "C",
    color: "bg-green-500",
    items: [],
  },
  {
    label: "D",
    color: "bg-blue-500",
    items: ["ECE 108"],
  },
];

function TierList() {
  return (
    <div className="w-full border border-border overflow-hidden rounded text-xs my-2">
      {tiers.map((tier) => (
        <div
          key={tier.label}
          className="flex items-stretch border-b border-border last:border-b-0"
        >
          <div
            className={`${tier.color} w-8 shrink-0 flex items-center justify-center font-bold text-white`}
          >
            {tier.label}
          </div>
          <div className="flex flex-wrap gap-1.5 p-2 min-h-8 items-center bg-muted/30">
            {tier.items.length === 0 ? (
              <span className="text-muted-foreground italic">—</span>
            ) : (
              tier.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded bg-muted border border-border font-medium"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function SemesterTwo() {
  return (
    <main>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">1B ECE</h1>
          <span className="text-muted-foreground text-sm">Apr 2026</span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            ECE 1B was&hellip; interesting. It had its pros and cons compared to
            1A. It definitely went faster than 1A.
          </p>

          <p className="font-medium underline">Pros</p>

          <p className="font-medium">Computer Engineering Supremacy</p>
          <p>
            All of my classes were with my stream 8 cohort, the same group of
            people I&apos;d see for the next 3 years (ECE Reunited: Fall 2028,
            3B).
          </p>

          <p className="font-medium">Nothing Else to do Except Grind</p>
          <p>
            The Waterloo Winter term doesn&apos;t have much happening, which
            helped me incentivize studying and co-op grind.
          </p>

          <p className="font-medium">Food Places</p>
          <p>
            This term, I tried eating at different places outside of the plaza.
          </p>
          <FoodMap />

          <p className="font-medium underline">Cons</p>

          <p className="font-medium">The Weather</p>
          <p>
            Fun fact: The most similar foreign climate to Waterloo is Sapporo,
            Japan, which is the capital of the mountainous Hokkaido prefecture.
          </p>
          <p>
            The weather was on and off. Until April, the weather was freezing
            cold. There was a record breaking two snow days this 1B term, which
            never happens.
          </p>

          <p className="font-medium">Missing the Day Ones</p>
          <p>
            I had to make new friend groups and talk to a bunch of new people.
            Which was fun, but was sad knowing that I won&apos;t be able to see
            some friends for 3 years.
          </p>

          <p className="font-medium">Burnout</p>
          <p>
            I never want to study for 8 months in a row again. I&apos;m glad
            I&apos;m alternating co-op and study terms till I graduate.
          </p>

          <p className="font-medium underline">Courses Rated</p>
          <p>
            Running back the Tier List from 1A, here is what it looks like now.
          </p>
          <TierList />

          <p className="font-medium underline">ECE 124 - Digital Circuits and Systems</p>
          <p className="text-muted-foreground text-xs">
            Instructor: Prof. Bill Bishop
          </p>
          <p>
            For the entire semester I had this course in C/D tier, but hear me
            out. Lab Support was very useful. The entire course was on slides
            from day one, There were ~10 past midterms and 3 past finals to
            study off of. Labs were only 3-4 hrs with good focus. I dropped a
            62 on the midterm, and a 91 on the final.
          </p>

          <p className="font-medium underline">
            ECE 192 - Engineering Economics and Impact on Society
          </p>
          <p className="text-muted-foreground text-xs">
            Instructor: Prof. Dario Peralta
          </p>
          <p>
            Now you may be asking, why is ECE 192 in A tier? Well, ECE 192 is
            in A tier because the prof is a HOMIE. Half of the course grade
            comes from a group assignment and 2 multiple choice learn quizzes,
            meaning it was impossible to fail.
          </p>
          <p>
            The final was relatively straightforward. There were five questions
            in total and three bonus questions. The marking scheme also made
            losing marks hard.
          </p>

          <p className="font-medium underline">MATH 119 - Calculus 2 for Engineering</p>
          <p className="text-muted-foreground text-xs">
            Instructor: Prof. Sachin Kotecha
          </p>
          <p>
            Goated prof, goated content pre-midterms. After midterms the course
            just became a pattern recognition grind with divergence/convergence
            tests being half the content.
          </p>

          <p className="font-medium underline">ECE 140 - Linear Circuits</p>
          <p className="text-muted-foreground text-xs">
            Instructor: Prof. Mike Cooper-Stachowsky
          </p>
          <p>
            Where do I even start? Probably the most important course in 1B for
            Electrical Engineers and anyone interested in analog / hardware. The
            content was straightforward - just do as many problems as you can
            and pray you see the same circuit on assessments.
          </p>
          <p>
            As far as I&apos;m aware, Peter and Mike both wrote the
            midterm/final. They like putting very tricky passive sign convention
            questions or like measuring voltage from a weird reference point.
            Make sure you get nodal and mesh analysis down as well as Thevenin
            and Norton.
          </p>

          <p className="font-medium underline">ECE 106 - Electricity and Magnetism</p>
          <p className="text-muted-foreground text-xs">
            Instructor: Prof. Hamed Majedi
          </p>
          <p>
            Majedi did a great job being an enthusiastic, and interesting
            professor. He wrote a very fair midterm. In fact, the midterm was so
            fair that it had one of the highest midterm averages in the history
            of the course. Because of this, he made the final difficult. Passed
            fine, did way better than 1A physics.
          </p>

          <p className="font-medium underline">ECE 108 - Discrete Math</p>
          <p className="text-muted-foreground text-xs">
            Instructor: Prof. John Thistle
          </p>
          <p>
            The course felt frustrating. Doing propositional logic, proofs, and
            set theory work was fun of course, but the way assignments, exams,
            and lectures were presented in this course was terrible. Assignments
            were not marked until AFTER the final. The final had only two
            questions, leaving 25% of the final course grade on a single
            question on relations, with the other 25% on a single combinatorics
            problem. I enjoyed the content but not the way this course was
            taught.
          </p>
        </div>
        <Link href="/writing" className="underline text-sm">
          ← back
        </Link>
      </div>
    </main>
  );
}
