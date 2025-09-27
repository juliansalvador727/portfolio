import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UWLogo from "@/components/icons/UWLogo.png";
import OrbitalLogo from "@/components/icons/Orbital.png";
import VayaLogo from "@/components/icons/VayaLogo.png";
import SFULogo from "@/components/icons/SFULogo.png";
import GojoLogo from "@/components/icons/GojoLogo.png";

export default function Home() {
  return (
    <>
      <main>
        <div className="space-y-1">
          <p>hi, my name is julian.</p>
          <p>currently, i&apos;m... </p>
          <ul className="list-none">
            <li className="flex items-center space-x-1">
              <span>‣</span>
              <span>a computer engineering student @</span>
              <Image src={UWLogo} alt="UW Logo" width={15} height={15} />
              <span>
                <Link
                  className="underline"
                  href="https://uwaterloo.ca/electrical-computer-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  uwaterloo
                </Link>
              </span>
            </li>
            <li className="flex items-center space-x-1">
              <span>‣</span>
              <span>doing fullstack & sending a satellite to space @</span>
              <Image
                src={OrbitalLogo}
                alt="Orbital Logo"
                width={15}
                height={15}
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
          </ul>

          <p>in the past i...</p>
          <ul className="list-none">
            <li className="flex items-center space-x-1">
              <span>‣</span>
              <span>did engineering outreach to 250+ students @</span>
              <Image src={SFULogo} alt="SFU Logo" width={25} height={20} />
              <span>
                <Link
                  className="underline"
                  href="https://www.sfu.ca/fas/about/community-engagement-outreach/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Simon Fraser University
                </Link>
              </span>
            </li>
            <li className="flex items-center space-x-1">
              <span>‣</span>
              <span>won 2 piano concerto competitions @</span>
              <Image src={VayaLogo} alt="Vaya Logo" width={15} height={15} />
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
            <li className="flex items-center space-x-1">
              <span>‣</span>
              <span>coloured the greatest jujutsu sorcerer</span>
              <Image
                src={GojoLogo}
                alt="Vaya Logo"
                width={20}
                height={20}
              ></Image>
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

        <Button className="mt-8" variant="outline">
          check out my projects
        </Button>
      </main>
    </>
  );
}
