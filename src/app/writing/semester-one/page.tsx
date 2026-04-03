"use client";

import Link from "next/link";
import { useState } from "react";

function YouTubeFacade({ id }: { id: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="relative aspect-video w-full overflow-hidden rounded group"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt="Video thumbnail"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white transition-colors flex items-center justify-center shadow-md">
          <svg
            className="w-6 h-6 text-black ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

const tiers = [
  {
    label: "S",
    color: "bg-red-500",
    items: ["MATH 115", "ECE 150"],
  },
  {
    label: "A",
    color: "bg-orange-400",
    items: ["MATH 117"],
  },
  {
    label: "B",
    color: "bg-yellow-400",
    items: [],
  },
  {
    label: "C",
    color: "bg-green-500",
    items: ["ECE 105"],
  },
  {
    label: "D",
    color: "bg-blue-500",
    items: ["ECE 198", "ECE 190", "COMNST 192"],
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

export default function SemesterOne() {
  return (
    <main>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">1A ECE</h1>
          <span className="text-muted-foreground text-sm">Dec 2025</span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-medium">Check out this video I edited!</p>
          <YouTubeFacade id="43SANkiLjbQ" />
          <p>
            Writing this has long been overdue. Currently it is the week before
            1B exams (heavily procrastinating right now) and I wanted to take
            the time to reflect over 1A and how my first semester of University
            went, and the whole timeline with Waterloo in general.
          </p>
          <p>
            I was first introduced to the University of Waterloo at HackCamp
            2023 (UBC). Everyone I talked to there said to go to Waterloo and
            not UBC. Fast forward to March of 2025, I couldn&apos;t believe my
            eyes when I actually got in. I thought I would get rejected because
            of my English and Chemistry grades.
          </p>
          <p>
            The summer after Grade 12 went by incredibly fast. I was working
            full time so I didn&apos;t have a chance to really grind out
            projects or do anything to prepare for university. When the time
            came to leave, I still was unable to process that I was leaving
            family and friends behind to spend the next 4 and 2/3rds years 4000
            km away from home.
          </p>
          <p className="font-medium underline">Arriving at Waterloo</p>
          <p>
            The first weeks went by quickly. I went to all the O-week events and
            tried to meet as many people as possible. Honestly, it was very fun
            but incredibly exhausting.
          </p>

          <p className="font-medium underline">Courses Rated</p>
          <p>
            These courses follow a tier list rather than a conventional x &gt; y
            &gt; z ranking. Courses are subjective to my own opinions and the
            overall ECE experience will be different term to term.
          </p>
          <TierList />
          <p className="font-medium underline">MATH 115 - Linear Algebra</p>
          <p className="text-muted-foreground text-xs">
            Professor: Ryan Trelford
          </p>
          <p>
            My favorite course of the term. The course was so well organized and
            structured for being an introductory topic to abstract math. Cliche
            advice but I would recommend watching 3blue1brown&apos;s series on
            Linear Algebra.
          </p>
          <p className="font-medium underline">
            ECE 150 - Fundamentals of Programming
          </p>
          <p className="text-muted-foreground text-xs">
            Professor: Douglas Harder
          </p>
          <p>
            I didn&apos;t have Dietl, which may have influenced my ranking
            significantly. I rate this course in the S tier because I was
            already familiar with C++, and I believe it was well run and fair.
            The midterm was brutal for many, which resulted in one of the most
            fair finals. In fact, the final was so fair that the prof sent an
            email saying if you got below a 70 that you were gonna fail in the
            future. Fair I guess?
          </p>
          <p>
            This entire course is doable without going to a single lecture. Prof
            Harder has slides, and videos on every topic. He also went out of
            his way to create programming exercises, review the C++ standard
            library, and do a bunch of cool stuff this term.
          </p>
          <p>
            As well, since the final exam grade could replace the midterm and
            every project grade, all you need to do is study for the final and
            you&apos;d be fine (though not recommended). There were little to no
            P71 incidents this term as far as I was aware.
          </p>
          <p className="font-medium underline">MATH 117 - Calculus 1 &amp; 2</p>
          <p className="text-muted-foreground text-xs">
            Professor: Sachin Kotecha
          </p>
          <p>
            Fair, interesting course. Nothing wrong with Calc 1 &amp; 2. Sachin
            wrote really good notes.
          </p>
          <p className="font-medium underline">ECE 105 - Classical Mechanics</p>
          <p className="text-muted-foreground text-xs">
            Professor: Jamie Forrest
          </p>
          <p>
            People didn&apos;t like this course, the professor, or the content.
            I didn&apos;t like all three. I ended up skipping most of the
            lectures in the latter half of the course. When it came to studying
            I crammed the midterm and finals the day before. This course is the
            reason I&apos;m not on the honor roll LOL.
          </p>
          <p className="font-medium underline">ECE 198 - Project Studio</p>
          <p className="text-muted-foreground text-xs">
            Professor: Simar Saini
          </p>
          <p>
            Fat time waster. Luckily, it was nerfed / a bird course compared to
            previous years. If this course is still being taught the way it is,
            I would recommend implementing a pure software solution and save
            your time for more important things.
          </p>
          <p className="font-medium underline">
            ECE 190 - Ethics and Profession of Engineering
          </p>
          <p className="text-muted-foreground text-xs">
            Professor: Dan Davison
          </p>
          <p>
            Despite this course being a time waster, this was definitely a more
            interesting course than the other D tier courses. Learned a lot of
            random trivia and random facts. (as well as the Dan Davison method,
            for those who know).
          </p>
          <p className="font-medium underline">
            COMNST 192 - Engineering Communication
          </p>
          <p className="text-muted-foreground text-xs">
            Professor: William Shakespeare
          </p>
          <p>
            Mandatory lectures. After the first project i.e. a persuasive
            speech, the course just became a Canva grind. Still liked this
            course way more than what ENGL 192 would have been (I don&apos;t
            like writing 2000 word uni essays).
          </p>
        </div>
        <Link href="/writing" className="underline text-sm">
          ← back
        </Link>
      </div>
    </main>
  );
}
