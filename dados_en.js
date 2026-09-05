/* UNIVERSATLAS · fichas em INGLÊS (r233, fase 2 do idioma).
   Carregado só quando LANG === 'en' (document.write no bloco 1). Cada chave é
   o id do corpo; os campos presentes SUBSTITUEM os da ficha em português
   (kind, quick, sections, facts, fict, exLuas, moonsMeta). Números no formato
   inglês (ponto decimal, vírgula de milhar). Sem emoji, sem travessão. */
window.DADOS_EN = {
sol: {
  kind: 'Yellow dwarf',
  quick: [['TYPE','G2V'],['RADIUS','1 R☉'],['SURF. TEMP.','5,505 °C'],['ROTATION','25 to 35 d'],['AGE','4.6 billion years'],['PLANETS','8']],
  sections: [
    {t:'STRUCTURE', rows:[['Diameter','1.39 million km (109 Earths)'],['Mass','1.99 × 10³⁰ kg'],['Density','1.41 g/cm³'],['Gravity','28 g'],['Core temp.','15 million °C']]},
    {t:'ROTATION', rows:[['Type','Differential (prograde)'],['Equator','~25 days'],['Poles','~35 days'],['Lap around the galaxy','~230 million years']]},
    {t:'RECORD', rows:[['Composition','73% H · 25% He'],['Consumption','4 million t of mass per second'],['Remaining life','~5 billion years'],['Population','0 (we hope)']]}
  ],
  facts: ['It holds 99.86% of all the mass in the Solar System.', 'Light made in the core takes up to 100,000 years to escape to the surface, and only 8.3 min to reach Earth.', 'In ~5 billion years it becomes a red giant and swallows Mercury and Venus.'],
  fict: 'Star Trek: "Sol III" is what Starfleet calls Earth.'
},
mercurio: {
  kind: 'Rocky',
  quick: [['GRAVITY','0.38 g'],['MEAN TEMP.','167 °C'],['SOLAR DAY','176 d'],['YEAR','88 d'],['MOONS','0'],['WATER','polar ice']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','57.9 million km (0.39 AU)'],['Year','88 Earth days'],['Sidereal day','58.6 days'],['Solar day','176 days'],['Rotation type','Prograde · 3:2 resonance'],['Orbital speed','47.4 km/s'],['Axial tilt','0.03°'],['Seasons','Practically none']]},
    {t:'STRUCTURE', rows:[['Diameter','4,879 km'],['Mass','3.30 × 10²³ kg'],['Density','5.43 g/cm³'],['Area','74.8 million km²'],['Core','Iron · ~85% of the radius']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Day temp.','up to 430 °C'],['Night temp.','down to −180 °C'],['Atmosphere','Thin exosphere (O₂, Na, H)'],['Pressure','~0 atm'],['Water','Ice in polar craters']]},
    {t:'RECORD', rows:[['Discovered','Antiquity (naked eye)'],['Missions','Mariner 10 · MESSENGER · BepiColombo (arrives in 2026)'],['Population','0']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','3.2 min'],['Probe from Earth','~7 years (BepiColombo)']]}
  ],
  facts: ['The largest temperature swing in the system: 610 °C between day and night.', 'A solar day (176 d) lasts longer than the year (88 d): you can watch the Sun rise, "go back" and rise again.', 'Even being the closest to the Sun, it is not the hottest planet. Venus is.'],
  fict: null
},
venus: {
  kind: 'Rocky',
  quick: [['GRAVITY','0.90 g'],['MEAN TEMP.','464 °C'],['SOLAR DAY','117 d'],['YEAR','225 d'],['MOONS','0'],['WATER','no']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','108.2 million km (0.72 AU)'],['Year','225 days'],['Sidereal day','243 days'],['Solar day','117 days'],['Rotation type','RETROGRADE, the Sun rises in the west'],['Orbital speed','35.0 km/s'],['Axial tilt','177° (upside down)'],['Seasons','No']]},
    {t:'STRUCTURE', rows:[['Diameter','12,104 km'],['Mass','4.87 × 10²⁴ kg'],['Density','5.24 g/cm³'],['Area','460.2 million km²'],['Terrain','Volcanoes and lava plains']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Day temp. ≈ night','~464 °C (greenhouse effect)'],['Atmosphere','96.5% CO₂ · 3.5% N₂'],['Clouds','Sulfuric acid'],['Pressure','92 atm (900 m under the sea)'],['Water','Traces of vapor']]},
    {t:'THE VENERA PROBES', rows:[['The challenge','Landing somewhere with 464 °C and 92 atmospheres, which crushes and cooks anything'],['Venera 3 (1966)','First human object to touch another planet, even though it crashed'],['Venera 7 (1970)','First successful landing on another planet. It transmitted for 23 minutes, lying on its side.'],['Venera 9 (1975)','Sent the first photo ever taken from the surface of another planet: flat rocks and an orange sky'],['Venera 13 (1982)','Color photos and sound. It survived 127 minutes when it was designed to last 32.'],['The price','Each probe melted in little more than an hour, and the Soviets sent more than a dozen']]},
    {t:'RECORD', rows:[['Discovered','Known since Antiquity, and called a star for a long time'],['The historic mistake','Because of the clouds, many people imagined a tropical, swampy world underneath'],['Magellan (1990)','Mapped 98% of the surface with radar, through the clouds'],['Akatsuki','The Japanese probe that missed its orbit insertion in 2010 and managed to enter orbit five years later'],['The future','NASA\'s VERITAS and DAVINCI, and Europe\'s EnVision, go back there in the 2030s']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','6.0 min'],['Probe from Earth','~4 months']]}
  ],
  facts: ['The Venera probes took color photos of the surface of another planet in 1982, and melted little more than an hour later.', 'The first image ever made of the ground of another planet came from here, in 1975.', 'The hottest planet in the system, hot enough to melt lead.', 'It spins so slowly that the sidereal day (243 d) is longer than the year (225 d).', 'After the Sun and the Moon, it is the brightest object in our sky (the "Morning Star").'],
  fict: 'The Expanse: the "Arboghast incident" happens in orbit around Venus.'
},
terra: {
  kind: 'Rocky · habitable',
  quick: [['GRAVITY','1 g'],['MEAN TEMP.','15 °C'],['DAY','24 h'],['YEAR','365.25 d'],['MOONS','1'],['WATER','71%']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','149.6 million km (1 AU)'],['Year','365.25 days'],['Sidereal day','23 h 56 min'],['Solar day','24 h'],['Rotation type','Prograde'],['Orbital speed','29.8 km/s'],['Axial tilt','23.4°'],['Seasons','Yes, 4, caused by the tilt']]},
    {t:'STRUCTURE', rows:[['Diameter','12,742 km'],['Mass','5.97 × 10²⁴ kg'],['Density','5.51 g/cm³ (the highest in the system)'],['Area','510 million km²'],['Plate tectonics','Yes, the only confirmed case']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Lowest temp. recorded','−89 °C (Antarctica)'],['Highest temp. recorded','57 °C'],['Atmosphere','78% N₂ · 21% O₂ · 1% Ar'],['Pressure','1 atm'],['Water','71% of the surface · liquid']]},
    {t:'RECORD', rows:[['Discovered','·'],['Life','The only planet known to have life'],['Population','8.1 billion humans'],['Artificial satellites','~10,000 active']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','8.3 min'],['You are here','☉']]}
  ],
  facts: ['It is not a perfect sphere: the radius at the equator is 21 km larger than at the poles.', 'The Moon moves away from us 3.8 cm per year.', 'Seen from afar it is a "pale blue dot": the Voyager 1 photo was taken from 6 billion km away.'],
  fict: 'Star Trek: home of Starfleet (San Francisco, 23rd century). The Expanse: governed by the UN.',
  exLuas: 'The Big Splat hypothesis (2011) suggests a second, smaller moon in the past, which gently collided with the Moon and would have become the highlands of the far side.'
},
lua: {
  kind: 'Rocky moon',
  quick: [['DIAMETER','3,474 km'],['GRAVITY','0.166 g'],['ORBIT','27.3 d'],['ROTATION','synchronous'],['DISCOVERED','·'],['WATER','polar ice']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from Earth','384,400 km'],['Orbital period','27.3 days'],['Rotation','Synchronous, it always shows the same face'],['Phases','29.5 days (lunar month)']]},
    {t:'THE VISITS', rows:[['1966','Luna 9 lands softly: the ground holds weight'],['1968 to 1972','The Apollo era: 9 crewed missions, 12 people walked here'],['1970 to 1976','The Luna robots bring samples back by themselves'],['2019 to 2024','The new race: Chang\'e on the far side, SLIM with precision'],['The future','Artemis III promises the return with people']]},
    {t:'STRUCTURE', rows:[['Diameter','3,474 km'],['Density','3.34 g/cm³'],['Day/night temp.','127 °C / −173 °C'],['Origin','Giant impact (Theia, 4.5 billion years ago)']]},
    {t:'RECORD', rows:[['First visit','Apollo 11 · 07/20/1969'],['Humans who walked here','12'],['Current program','Artemis (NASA)']]}
  ],
  facts: ['It is responsible for the tides, and for stabilizing Earth\'s tilt.', 'It drifts away 3.8 cm per year; in the distant past the Earth day was shorter because of it.'],
  fict: '2001: A Space Odyssey: the monolith is found in the Tycho crater.'
},
marte: {
  kind: 'Rocky',
  quick: [['GRAVITY','0.38 g'],['MEAN TEMP.','−63 °C'],['DAY','24 h 37'],['YEAR','687 d'],['MOONS','2'],['WATER','ice']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','227.9 million km (1.52 AU)'],['Year','687 Earth days'],['Day ("sol")','24 h 37 min'],['Rotation type','Prograde'],['Orbital speed','24.1 km/s'],['Axial tilt','25.2°'],['Seasons','Yes, similar to ours, twice as long']]},
    {t:'STRUCTURE', rows:[['Diameter','6,779 km'],['Mass','6.42 × 10²³ kg'],['Density','3.93 g/cm³'],['Area','144.8 million km² (≈ Earth\'s land area)'],['Terrain','Olympus Mons: 21.9 km · Valles Marineris: 4,000 km']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Day temp.','up to 20 °C (equator, summer)'],['Night temp.','down to −140 °C'],['Atmosphere','95% CO₂ · thin'],['Pressure','0.006 atm'],['Water','Ice at the poles and underground · ancient rivers']]},
    {t:'RECORD', rows:[['Discovered','Antiquity'],['Active missions','Perseverance · Curiosity · orbiters'],['Population','0 (for now)']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','12.7 min'],['Probe from Earth','~7 months']]}
  ],
  facts: ['It has the largest volcano in the Solar System: Olympus Mons, 2.5 times Everest.', 'The Martian sunset is BLUE: the dust scatters light the opposite way from Earth.', 'Phobos orbits so fast that it rises in the west and crosses the sky twice a day.'],
  fict: 'The Expanse: the Martian Congressional Republic (MCRN). Total Recall · The Martian.',
  exLuas: 'Models suggest Mars once had a much larger moon, torn apart by tides: Phobos and Deimos would be the remains, and Phobos repeats that fate in ~50 million years.'
},
jupiter: {
  kind: 'Gas giant',
  quick: [['GRAVITY','2.53 g'],['CLOUD-TOP TEMP.','−110 °C'],['DAY','9 h 56'],['YEAR','11.9 years'],['MOONS','95'],['RINGS','faint']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','778.5 million km (5.2 AU)'],['Year','11.86 years'],['Day','9 h 56 min, the fastest'],['Rotation type','Prograde'],['Orbital speed','13.1 km/s'],['Axial tilt','3.1°'],['Seasons','Minimal']]},
    {t:'STRUCTURE', rows:[['Diameter','139,820 km (11 Earths)'],['Mass','1.90 × 10²⁷ kg (318 Earths)'],['Density','1.33 g/cm³'],['Area','61.4 billion km² (121 × Earth)'],['Surface','None, gas all the way down to metallic H']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Cloud-top temp.','−110 °C'],['Atmosphere','90% H₂ · 10% He'],['Great Red Spot','A storm bigger than Earth, active for centuries'],['Winds','~600 km/h'],['Water','Vapor in the deep layers']]},
    {t:'RECORD', rows:[['Discovered','Antiquity'],['Galilean moons','1610 · Galileo Galilei'],['Active mission','Juno (NASA) · Europa Clipper on its way'],['Population','0']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','43.3 min'],['Probe from Earth','~5 years (Juno)']]}
  ],
  facts: ['It has 2.5 times the mass of all the other planets combined.', 'It works as the system\'s "vacuum cleaner": its gravity deflects comets and asteroids.', 'Galileo\'s 4 moons (1610) were the first proof that not everything orbits the Earth.'],
  fict: '2001: A Space Odyssey: destination of the Discovery One.',
  moonsMeta: '95 CONFIRMED · 4 MAIN'
},
saturno: {
  kind: 'Gas giant · ringed',
  quick: [['GRAVITY','1.06 g'],['CLOUD-TOP TEMP.','−139 °C'],['DAY','10 h 33'],['YEAR','29.4 years'],['MOONS','274'],['RINGS','YES']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','1.43 billion km (9.5 AU)'],['Year','29.4 years'],['Day','10 h 33 min'],['Rotation type','Prograde'],['Orbital speed','9.7 km/s'],['Axial tilt','26.7°'],['Seasons','Yes, ~7 years each']]},
    {t:'STRUCTURE', rows:[['Diameter','116,460 km'],['Mass','5.68 × 10²⁶ kg (95 Earths)'],['Density','0.69 g/cm³, it would float on water'],['Area','42.7 billion km²'],['Rings','282,000 km wide · ~10 m to 1 km thick']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Mean temp.','−139 °C'],['Atmosphere','96% H₂ · 3% He'],['Winds','up to 1,800 km/h'],['Polar hexagon','A six-sided storm at the north pole'],['Water','Ice, the rings are 99% water ice']]},
    {t:'RECORD', rows:[['Discovered','Antiquity'],['Rings identified','1655 · Christiaan Huygens'],['Mission','Cassini (2004 to 2017) · final plunge into the planet'],['Population','0']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','79.7 min'],['Probe from Earth','~7 years (Cassini)']]}
  ],
  facts: ['It is the only planet less dense than water.', 'The rings are young (maybe ~100 million years) and will vanish in the distant future: it "rains" ring onto the planet.', 'In 2025 the count of confirmed moons jumped to 274, the record of the system.'],
  fict: 'Interstellar: the wormhole appears in orbit around Saturn.',
  moonsMeta: '274 CONFIRMED · 9 MAIN'
},
urano: {
  kind: 'Ice giant',
  quick: [['GRAVITY','0.89 g'],['MEAN TEMP.','−195 °C'],['DAY','17 h 14'],['YEAR','84 years'],['MOONS','28'],['RINGS','13']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','2.87 billion km (19.2 AU)'],['Year','84 years'],['Day','17 h 14 min'],['Rotation type','RETROGRADE · it spins "lying down"'],['Orbital speed','6.8 km/s'],['Axial tilt','98°'],['Seasons','Extreme: 21 years of day, 21 of night at the poles']]},
    {t:'STRUCTURE', rows:[['Diameter','50,724 km'],['Mass','8.68 × 10²⁵ kg (14.5 Earths)'],['Density','1.27 g/cm³'],['Area','8.1 billion km²'],['Interior','"Ices" of water, ammonia and methane']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Lowest temp.','−224 °C, the record of the system'],['Atmosphere','83% H₂ · 15% He · 2% CH₄'],['Color','Methane absorbs the red → cyan'],['Water','Superheated ice mantle']]},
    {t:'RECORD', rows:[['Discovered','03/13/1781 · William Herschel'],['Milestone','1st planet discovered with a telescope'],['Only visit','Voyager 2 · 1986'],['Moons','Named after Shakespeare and Pope'],['Population','0']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','2.7 h'],['Probe from Earth','~8.5 years (Voyager 2)']]}
  ],
  facts: ['It rolls on its side: it probably took a colossal impact in the past.', 'Even closer to the Sun than Neptune, it is the COLDEST planet.', 'The atmosphere has hydrogen sulfide: the planet literally smells like rotten eggs.', 'Herschel wanted to call it "Georgium Sidus", after King George III. It did not stick.'],
  fict: 'It was visited only once, in 1986, and the next proposed mission is the number one priority of the decade in American astronomy.',
  moonsMeta: '28 CONFIRMED · 3 MAIN'
},
netuno: {
  kind: 'Ice giant',
  quick: [['GRAVITY','1.14 g'],['MEAN TEMP.','−201 °C'],['DAY','16 h 06'],['YEAR','165 years'],['MOONS','16'],['WINDS','2,100 km/h']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','4.50 billion km (30 AU)'],['Year','165 years'],['Day','16 h 06 min'],['Rotation type','Prograde'],['Orbital speed','5.4 km/s'],['Axial tilt','28.3°'],['Seasons','Yes, ~40 years each']]},
    {t:'STRUCTURE', rows:[['Diameter','49,244 km'],['Mass','1.02 × 10²⁶ kg (17 Earths)'],['Density','1.64 g/cm³'],['Area','7.6 billion km²'],['Interior','Possible "diamond rain"']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Mean temp.','−201 °C'],['Atmosphere','80% H₂ · 19% He · 1.5% CH₄'],['Winds','Up to 2,100 km/h, the strongest in the system'],['Great Dark Spot','Storms that appear and vanish'],['Water','Ice mantle']]},
    {t:'RECORD', rows:[['Discovered','09/23/1846 · Galle & Le Verrier'],['Milestone','Predicted by MATHEMATICS before it was seen'],['Only visit','Voyager 2 · 1989'],['1 Neptunian year','Completed its 1st orbit since discovery in 2011'],['Population','0']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','4.2 h'],['Probe from Earth','~12 years (Voyager 2)']]}
  ],
  facts: ['It was discovered "on paper": Le Verrier calculated where it should be from the perturbations on Uranus.', 'Since its discovery (1846), it has completed only 1 lap around the Sun.', 'It gets 900 times less sunlight than Earth, and still has the most violent winds.', 'Deep inside, the pressure probably makes it rain real DIAMONDS.'],
  fict: 'Ad Astra: the final station of the journey orbits Neptune.',
  moonsMeta: '16 CONFIRMED · 1 MAIN'
},
plutao: {
  kind: 'Dwarf planet',
  quick: [['GRAVITY','0.06 g'],['MEAN TEMP.','−229 °C'],['DAY','6.4 d'],['YEAR','248 years'],['MOONS','5'],['HEART','yes ♥']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the Sun','5.9 billion km (39.5 AU, average)'],['Orbit','Eccentric, sometimes closer than Neptune'],['Year','248 years'],['Day','6.4 days'],['Rotation type','Retrograde · synchronous with Charon'],['Axial tilt','120°'],['Seasons','Yes, extreme']]},
    {t:'STRUCTURE', rows:[['Diameter','2,377 km (smaller than the Moon)'],['Mass','1.31 × 10²² kg'],['Density','1.85 g/cm³'],['Area','17.7 million km² (≈ Russia)'],['Tombaugh Regio','The heart-shaped plain of N₂ ice']]},
    {t:'CLIMATE & ATMOSPHERE', rows:[['Mean temp.','−229 °C'],['Atmosphere','N₂, CH₄, CO, thin'],['Detail','The atmosphere FREEZES and falls when it moves away from the Sun'],['Water','Ice, and maybe an inner ocean']]},
    {t:'RECORD', rows:[['Discovered','02/18/1930 · Clyde Tombaugh'],['Reclassification','2006 · dwarf planet (IAU)'],['Visit','New Horizons · 07/14/2015'],['Population','0']]},
    {t:'LINK & TRAVEL', rows:[['Sunlight to here','5.5 h'],['Probe from Earth','9.5 years (New Horizons)']]}
  ],
  facts: ['Pluto and Charon spin locked facing each other: a "double planet".', 'From 1930 to 2006 it was the 9th planet. The reclassification still hurts on the internet.', 'The ashes of Clyde Tombaugh, its discoverer, travel aboard New Horizons.'],
  fict: null,
  moonsMeta: '5 CONFIRMED · 1 MAIN'
},
/* o card do próprio sistema */
__sys: {
  sol: {
    hint: 'TAP A PLANET TO LOCK THE LINK',
    card: {
      desig: 'STAR SYSTEM · ORION ARM', kind: 'Home',
      quick: [['STAR','1 (G2V)'],['PLANETS','8'],['MOONS','290+'],['AGE','4.6 billion years'],['INHABITED','1 confirmed'],['PROBES OUTSIDE','5']],
      sections: [{t:'RECORD', rows:[['Address','Orion Arm, ~26,000 ly from the galactic center'],['Lap around the galaxy','~230 million years'],['Frontier','The heliopause, Voyager 1 and 2 have already crossed it'],['Nearest neighbor','Alpha Centauri, 4.37 ly away']]}],
      facts: ['Tap the star or a planet to see its data; tap again to enter.']
    }
  }
}
};
