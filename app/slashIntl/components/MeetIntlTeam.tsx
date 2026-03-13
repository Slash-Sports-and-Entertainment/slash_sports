"use client";
import type { JSX } from "react";
import { internationalTeamData } from "@/app/data/teams";
import { TeamCards } from "@/app/lib/components/TeamCards";

export default function MeetIntlTeam(): JSX.Element {
  return(
    <section id="meet-intl-team">
      <div id="meet-intl-team-wrapper" className="wrapper">
        <h1>
          <span className="outline-text">
            OUR
          </span> TEAM
        </h1>
        <div id="intlTeam-cards-container">
          {internationalTeamData.map((person) => {
            return(
              <article 
                className="team-cards" 
                key={person.id}
              >
                <TeamCards person={person} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}