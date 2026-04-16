"use client";
import type { JSX } from "react";
import { internationalTeamData } from "@/app/data/teams";
import { TeamCards } from "@/app/lib/components/TeamCards";

export default function MeetIntlTeam(): JSX.Element {
  return(
    <section id="meet-intl-team" aria-labelledby="meet-intl-team-title">
      <div id="meet-intl-team-wrapper" className="wrapper">
        <h2 id="meet-intl-team-title">
          <span className="outline-text">
            OUR
          </span> TEAM
        </h2>
        <div id="intlTeam-cards-container" role="list">
          {internationalTeamData.map((person) => {
            return(
              <article 
                className="team-cards" 
                key={person.id}
                role="listitem"
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