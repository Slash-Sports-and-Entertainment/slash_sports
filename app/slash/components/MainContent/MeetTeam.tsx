"use client";
import type { JSX } from "react";
import { teamData } from "@/app/data/teams";
import { TeamCards } from "@/app/lib/components/TeamCards";

export default function MeetTeam(): JSX.Element {
  return(
    <section id="meet-team" aria-labelledby="meet-team-title">
      <div id="meet-team-wrapper" className="wrapper">
        <h2 id="meet-team-title">
          <span className="outline-text">
            MEET OUR
          </span> TEAM
        </h2>
        <div id="team-cards-container" role="list">
          {teamData.map((person) => {
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