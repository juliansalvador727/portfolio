import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UWLogo from "@/components/icons/UWLogo.png";
import OrbitalLogo from "@/components/icons/Orbital.png";
import MidSun from "@/components/icons/MidSun.png";
import VayaLogo from "@/components/icons/VayaLogo.png";
import SFULogo from "@/components/icons/SFULogo.png";
import GojoLogo from "@/components/icons/GojoLogo.png";
import Delta from "@/components/icons/Delta.png";

export default function Home() {
  return (
    <main>
      <div className="space-y-1">
        <p className="flex flex-wrap items-center gap-1">
          <span>Hi! My name is Julian Salvador,</span>
          <span>Comp Eng student @</span>

          <Image
            src={UWLogo}
            alt="UW Logo"
            width={16}
            height={16}
            className="inline-block w-4 h-4 sm:w-5 sm:h-5"
          />

          <Link
            className="underline"
            href="https://uwaterloo.ca/electrical-computer-engineering/"
            target="_blank"
            rel="noopener noreferrer"
          >
            uwaterloo
          </Link>
        </p>

        <p>currently, i&apos;m a </p>

        <ul className="list-none">
          <li className="flex flex-wrap items-center space-x-1">
            <span>‣</span>
            <span className="break-words">fullstack eng @</span>
            <Image
              src={OrbitalLogo}
              alt="Orbital Logo"
              width={15}
              height={15}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span>
              <Link
                className="underline"
                href="https://www.uworbital.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                orbital
              </Link>
            </span>
          </li>
          <li className="flex flex-wrap items-center space-x-1">
            <span>‣</span>
            <span className="break-words">firmware eng @</span>
            <Image
              src={MidSun}
              alt="Midnight Sun Logo"
              width={15}
              height={15}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span>
              <Link
                className="underline"
                href="https://www.uwmidsun.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                midsun
              </Link>
            </span>
          </li>
        </ul>

        <p>in the past i...</p>
        <ul className="list-none">
          <li className="flex flex-wrap items-center space-x-1">
            <span>‣</span>
            <span className="break-words">won top 3 @ </span>
            <Image
              src={Delta}
              alt="Deltahacks Logo"
              width={25}
              height={20}
              className="w-4 h-4 sm:w-4 sm:h-4"
            />
            <span>
              <Link
                className="underline"
                href="https://devpost.com/software/reeljobs"
                target="_blank"
                rel="noopener noreferrer"
              >
                DeltaHacks XII
              </Link>
            </span>
          </li>

          <li className="flex flex-wrap items-center space-x-1">
            <span>‣</span>
            <span className="break-words">
              did STEM outreach to 250+ students @
            </span>
            <Image
              src={SFULogo}
              alt="SFU Logo"
              width={25}
              height={20}
              className="w-5.5 h-3 sm:w-5.5 sm:h-3"
            />
            <span>
              <Link
                className="underline"
                href="https://www.sfu.ca/fas/about/community-engagement-outreach/"
                target="_blank"
                rel="noopener noreferrer"
              >
                sfu
              </Link>
            </span>
          </li>

          <li className="flex flex-wrap items-center space-x-1">
            <span>‣</span>
            <span className="break-words">
              won 2 piano concerto festivals @
            </span>
            <Image
              src={VayaLogo}
              alt="Vaya Logo"
              width={15}
              height={15}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span>
              <Link
                className="underline"
                href="https://vayafestivals.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                vayalive
              </Link>
            </span>
          </li>

          <li className="flex flex-wrap items-center space-x-1">
            <span>‣</span>
            <span className="break-words">drew the greatest sorcerer</span>
            <Image
              src={GojoLogo}
              alt="Gojo Logo"
              width={20}
              height={20}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span>
              <Link
                className="underline"
                href="https://www.desmos.com/calculator/9gcwysjqal"
                target="_blank"
                rel="noopener noreferrer"
              >
                with math
              </Link>
            </span>
          </li>
        </ul>
      </div>

      <Button className="mt-8" variant="outline" asChild>
        <Link href="/projects">check out my projects</Link>
      </Button>
    </main>
  );
}
