import React from 'react';
import {Link} from 'react-router-dom';
import {Donate} from '../Snippets';
import "../../scss/home.scss";

const GithubLink = () => (
  <a 
    href="https://github.com/chaoticbackup" className="name" 
    rel='noreferrer noopener' target="_blank"
  >
    Chaotic Backup Project
  </a>
);

export default function Home(props) {
  return (
    <div>
      <br />
      <div className="with-love">
        <div>Welcome to the <GithubLink />.</div>
        <span>Built by fans for fans.</span>
        <br /><br />
        <div>Made with <span className="heart">♥</span> by
          <br />Danude Sandstorm (Project Lead)
          <br />Chiodosin1 (Database Contributions)
          <br />Afjak and Blitser (Art and Knowledge)
        </div>
        <div>Do you like the site? You can donate to support it!</div>
        <div className="donate"><Donate /></div>
        <div className="lore">We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.  With an extensive lists of search options in the <Link to="/collection">collection</Link>, you'll find deck building mores streamlined than ever before.  Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the <Link to="/portal">Portal to Perim</Link> disapeared along with the site. You can again explore the official lore and information of Creatures!
        </div>
        <br />
        <div className="lore">
         <div className="title">Dawn of Perim</div>
          <div>Maxxor quickly fired off three shots from his Liquilizer, sending the Danian scurrying for cover. He knew the inscet would be calling for help. Alone they're not much, but a swarm of Danians were formidable foes. They were the least of his worries right now.</div>
          <div>The Eye of the Maelstrom is not exactly Maxxor's favorite location in all the OverWorld, but reports that a Cothica artifact is being excavated here made this trip more than necessary. Maxxor's scouts told him that the expedition is being carried out by an UnderWorld force led by Chaor himself.</div>
          <div>To control the Cothica is to rule all of Perim... and beyond. That's what the legends say.. and Maxxor has little choice but to believe this to be true. No one knows exactly what the Cothica is or how to wield its power. All Maxxor Knows for sure is that the elusive object must never fall into the wrong hands. And the definition of "wrong," as far as he's concerned, is any Creature from the UnderWorld... especially Chaor.</div>
          <div>Maxxor felt good about his team: Intress, Gespedan, Frafdo, Tangath Toborn, and Rellim. Huddled close to him, they awaited instructions on how to deploy for the battle about to ensue. Maxxor stepped forward to address his fellow OverWorlders just as the wind started picking up... a little too much.</div>
          <div>"Watch out! Windslash!" Intress shouted, but the warning was too late, as the attack sent the OverWorlders flying from their concealed position. Exposed and Seperated, they were bombarded with relentless assaults: Ember Swarm, Inferno Gust, Ektospasm, Torrent of Flame. As the dust cleared, they came face to face with their attackers.</div>
          <div>Takinom, Rothar, Zaur, Stelgar, Spyder and Chaor surrounded the OverWorlders. The UnderWorld leader roared with laughter. "Thought you could ambush us, Maxxor?" You underestimate me."</div>
          <div>Maxxor rose to his feet, his towering torso casting an imposing shadow with each lightning bolt from the storm. "Things are not always as they appear, Chaor." He raised his right hand high in the air. "Now!"</div>
          <div>As if summoned from beyond, tens of Mipedians suddenly materialized in flanking positions around the UnderWorld warriors. Far from their desert home, the tribe of invisible Creatures formed an uneasy alliance with Maxxor to prevent the Cothica from becoming an UnderWorldprize. Without Spectral Viewers, Chaor and his team were unable to see the reptilian battalion that had surrounded them.</div>
          <div>Sneering at the lizards, Chaor was undanted. "You're not the only one with friends in low places, Maxxor!" With that, hives of Danians began swarming in from the outskirts of the storm-ravaged landscape. What was a stand-off had now become an all-out war, with each tribe serving its own interests.</div>
          <div>Dozens of battles took place all around them as Maxxor and Char traded attacks: Pebblestorm. Steam Rage. Rock Wave. Ash Torrent. Closer and closer they moved until they were locked in hand-to-hand combat.</div>
          <div>"What have you done with the Cothica artifact, Maxxor?" Chaor screamed as a sludge Cush surged past his head.</div>
          <div>"Don't play coy with me, Chaor. We're here to stop <i>you</i> from getting it." Maxxor flipped his UnderWorld foe onto his back and they both somersaulted down an embankment.</div>
          <div>With the hard landing cam a harder realization. They both had been duped. The two warriors swuared off once again for battle, then found themselves unable to move - victims of Paral-Eyes attack stronger than either had ever experience. A dark figure approached as they struggled to shift their eyes. A look of shock registered on their otherwise frozen faces.</div>
          <div>Maxxor struggled to eek out the words, "It was..." Chaor finished the thought they both shared. "You!"</div>
          <div>The mysterious figure raised its arms as the ground began to shake. Then a deafening sound. And a blinding white light...</div>
          <div>Najarin awakes with a start - the early morning sun burning his eyes. Another night, the same dream. Or is it a prophecy? Before he can consider the imponderable, seven notes whisper their melody faintly in the wind, dancing in on morning's first light. The power of Mugic has no doubt been wielded in a faraway battle, the outcome of which could affect both the OverWorld and UnderWorld. But for now the Creatures of these realms rise once again to pursue their common cause, the Cothica, and to try to unravel the myster of the codes that weave their lives inextricably together.</div>
          <div>Thus a new day begins... its the Dawn of Perim.</div>
        </div>
        <div className="lore">
          <div className="title">M'arrillian Invasion</div>
          <div>Sitting on his throne, Chaor stared at the strange Creature called Phelphor. "Tell me again," the ruler of the UnderWorld commanded.</div>
          <div>"Long ago a Tribe now-forgotten, called the M'arrillians, located the Cothica. In fact, they stole it from us." Phelphor gestured with an open hand toward the others in the room. "And when I say 'us,' my friends, I mean all of us, as I am also an UnderWorlder!"</div>
          <div>"You look very little like an UnderWorlder," Agitos remarked coldly.</div>
          <div>Phelphor continued unphazed. "That forgotten Tribe took the Cothica into the Deep, beyond the Doors of the Deepmines and hid it there, to prevent us from getting what is rightfully ours."</div>
          <div>Chaor looked at Takinom who was seated nearby, "Have you heard of a forgotten Tribe beyond the Doors of the Deepmines, Takinom?"</div>
          <div>"No. And if it was true I would know. As would you, I'm sure, Chaor."</div>
          <div>Chaor turned his inquisitive gaze to Phelphor, "Well?"</div>
          <div>"This all took place very long ago. I am only aware of it due to my good fortune of being left frozen for a very long time in that pillar of ice. My fortune improved when one of your subjects," Phelphor gestured at Khybon, "thawed me earlier today."</div>
          <div>"Nonsense!" objected Takinom, "The doors of the Deepmines are sealed from this side, and further there is no written record suggesting someone or some tribe dwells behind them."</div>
          <div>"The M'arrillian Tribe has mastered the power of the mind," replied Phelphor. "No one recalls this Tribe, or their claiming of the Cothica, because their Chieftains made Perim forget all about them as they left. They didn't just retract into the Deep; they retracted into voluntary oblivion."</div>
          <div>Takinom shook her head, "And they missed you because you were frozen?"</div>
          <div>"Yes, I wouldn't be standing here today if I had not been frozen and out of their sight."</div>
          <div>Far from the throne room, more strangers observed the scene. In M'arr, the capital of the Deep, the Oligarchs of the governing Council, the Psikoom, gathered to receive the mental projection sent telepathically by their undercover agent, Phelphor.</div>
          <div>"The trap is set," the voice of the Oligarch echoed in the minds of the council. "Phelphor will succeed in getting the doors unlocked. Prepare the first wave of Chieftains to pass through the doors as they open, the Cothica will soon be ours." The Oligarch of the M'arrillians motioned at the members of the oligarchy before turning to leave.</div>
          <div>And, indeed, this menacing new Tribe's plan came to fruition not long after.</div>
          <div>The Doors of the Deepmines opened slowly at first, but the massive rush of water from the Deep soon forced the doors open wide. A torrent of tainted water poured into the UnderWorld, carrying within it a host of sinister Creatures. These strange entities seemed to be part aquatic, part pure energy and were unlike anything known in Perim. These were the Chieftains, and they embraced Perim with a greed and determination of frightening proportion. The Chieftains quickly established footholds at key points in the lands of the four Tribes.</div>
          <div>Within the UnderWorld region near the Lava Pond, a Chieftain named Milla'iin established local supremacy. The UnderWorlders struggled to mount a resistance, but found themselves facing their own friends who were mentally ocntrolled by Milla'iin and turned against Chaor's defending hordes.</div>
          <div>After the Lava pond fell, the M'arrillian Chieftains spread their reach to other regions of Perim. Ihun'kalin, a powerful Chieftain able to alter others' perception of time and space, secured a lair in a desolate and dry region of the Mipedian Desert. He began to flood the area with the help of Brainwashed Mipedians.</div>
          <div>The OverWorlders equally struggled against M'arrillian Chieftain Erak'tabb, who established a dark foothold in the Riverlands by Brainwashing many of the locals.</div>
          <div>The Danians saw their precious freshwater reservoir underneath Mount PIllar become tainted at the hands of the Chieftain of Fear, Neth'uar, who promised instant defeat for those who lacked courage. Even the brave Danians started to want for heart and valor.</div>
          <div>It may be true to say that phelphor, the undercover M'arrillian thawed by Khybon, has served his masters well. The ancient Doors are now open, and the hunt for the Cothica has a new contending Tribe armed with fearsome mental powers. Soon enough the mighty leader of the Oligarchy of the Deep will be ready to enter Perim to attempt to secure the Cothica for the M'arrillians.</div>
          <div>The OverWorlders, UnderWorlders, Danians and Mipedians will struggle to bring their individual strengths to bear against these intruders, but will this be enough to stop the M'arrillian Invasion?</div>
        </div>
        <div className="lore">
          <div className="title">Secrets of the Lost City</div>
          <div>...on a cloudless and starry night the culmination of more than a year of preperation occurred, as the four high muges of Perim convened on the deck of Captain Arrthoa's ship, the Ezoa, slowly sailing the moonlit surface of Lake Ken-I-Po.</div>
          <div>As Najarin, Enre-hep, Kopond, and Lore performed the hour-long mugical ritual, tones of an unworldly beauty rang out over the lake. Ultimately, a thundering rumble accompanied the ascension of a levitating island that erupted from the waters of the lake. Atop it perched a magnificent citadel, sporting four towers - each attuned to one of the elements of Perim. The high Muges had succeded in raising the lost City of the Elements. They knew that the city held powerful secrets and treasures, possibly even the secret to the Cothica. But who would control this prize?</div>
        </div>
      </div>
    </div>
  );
}
