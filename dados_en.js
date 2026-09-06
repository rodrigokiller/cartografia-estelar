/* UNIVERSATLAS · fichas em INGLÊS (r233, r238 e r239: o Sistema Solar inteiro).
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
/* ---- fase 2, parte 2 (r238): as luas do Sistema Solar e as missoes lunares ---- */
fobos: {
  kind: 'The doomed moon',
  quick: [['DIMENSIONS','27 × 22 × 18 km'],['ORBIT','7 h 39 min'],['DISCOVERED','1877'],['ALTITUDE','6,000 km, the lowest'],['FATE','a ring in ~50 million years'],['MISSION','MMX (JAXA) on its way']],
  sections: [
    {t:'THE DOOMED ONE', rows:[['The fall','It drops ~1.8 m per century: the tides of Mars pull it inward'],['The end','In ~50 million years it crosses the Roche limit and becomes a RING around Mars'],['The grooves','The long furrows on the surface may be the beginning of the breakup'],['Stickney','The 9 km crater: the impact nearly split the moon in half']]},
    {t:'RECORD', rows:[['Discovered','1877 · Asaph Hall, six days after Deimos'],['The name','Phobos, Fear, son of Ares'],['The Martian sky','It rises in the WEST and crosses the sky twice per Martian day'],['The mission','JAXA\'s MMX will land on it and bring a sample back']]}
  ],
  facts: ['It orbits faster than Mars spins: it rises in the west and crosses the sky twice per Martian day.', 'It drops 1.8 meters per century: in some 50 million years it becomes a ring around Mars.'],
  fict: 'Phobos is the setting of the first Doom (1993): the UAC base where everything starts sits right on it.'
},
deimos: {
  kind: 'The little moon that is saying goodbye',
  quick: [['DIMENSIONS','15 × 12 × 11 km'],['ORBIT','30.3 h'],['DISCOVERED','1877'],['SURFACE','smooth, dust-covered'],['HEADING','slowly drifting away'],['TEMP.','−40 to −112 °C']],
  sections: [
    {t:'THE ONE SAYING GOODBYE', rows:[['The heading','Unlike Phobos, it orbits beyond the balance point: it slowly DRIFTS AWAY'],['The surface','A blanket of fine dust filled almost every crater: the smoothest moon known'],['Seen from Mars','A bright dot that takes 2.7 days to cross the sky'],['The origin','Maybe a captured asteroid, maybe leftovers of a giant impact on Mars']]},
    {t:'RECORD', rows:[['Discovered','1877 · Asaph Hall, in the same week as Phobos'],['The name','Deimos, Dread, twin brother of Fear'],['The size','15 km: jumping hard, you would almost reach orbit'],['The gravity','0.0003 g: a person would weigh less than an orange']]}
  ],
  facts: ['While Phobos falls, Deimos flees: it orbits beyond the balance point and slowly drifts away from Mars.', 'Fine dust filled almost every crater: it is the smoothest moon known.'],
  fict: 'Deimos is the second episode of Doom (1993): in the game the whole moon vanishes and reappears floating over hell.'
},
io: {
  kind: 'The most volcanic place in the Solar System',
  quick: [['DIAMETER','3,643 km'],['GRAVITY','0.18 g'],['ORBIT','1.77 d'],['VOLCANOES','400+'],['CRATERS','none'],['JUNO','flew by at 1,500 km']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from Jupiter','421,000 km'],['Year','1.77 days'],['Rotation','Synchronous'],['The engine','Caught in a tug of war between Jupiter, Europa and Ganymede, it is kneaded nonstop']]},
    {t:'STRUCTURE', rows:[['Surface','Sulfur and frozen sulfur dioxide, hence the yellow, orange and white'],['No craters','Lava covers everything so fast that no impact scar survives'],['Loki Patera','A 200 km lava lake that brightens and dims in cycles'],['Mountains','Peaks up to 17 km, taller than Everest, pushed up by compression'],['The trail','It leaves a ring of plasma around Jupiter, fed by the volcanoes']]},
    {t:'RECORD', rows:[['Discovered','1610 · Galileo, one of the four that proved not everything orbits the Earth'],['1979','Voyager 1 catches a plume on the horizon: the first eruption seen beyond Earth'],['Juno (2023 and 2024)','Two passes at 1,500 km, the closest in twenty years, with true-color photos'],['What Juno saw','Lava lakes with shores of rock as smooth as glass and a peak named Steeple Mountain'],['The conclusion','Each volcano seems to have its own pocket of magma, with no global ocean of lava']]}
  ],
  facts: ['Some volcanoes throw plumes 500 km high, twice the altitude of the Space Station.', 'Not one impact crater: the whole surface is remade every million years.', 'Every second a tonne of material leaves Io and becomes a ring of plasma around Jupiter.'],
  fict: 'It is the classic mining colony of science fiction, from Outland (1981), the "western in space", to The Expanse.'
},
europa: {
  kind: 'Ice moon',
  quick: [['DIAMETER','3,122 km'],['ORBIT','3.6 d'],['DISCOVERED','1610'],['OCEAN','yes']],
  sections: [
    {t:'THE OCEAN', rows:[['The size','A global ocean ~100 km deep: twice all the water on Earth'],['The shell','15 to 25 km of ice on top, cracked by Jupiter\'s tides'],['The heating','The tide kneads the whole moon and warms the interior: liquid water for billions of years'],['The plumes','Hubble caught possible jets of water escaping through the ice']]},
    {t:'EUROPA CLIPPER', rows:[['The mission','Launched in 2024, arriving in 2030: the largest planetary probe NASA has ever built'],['The plan','49 low flybys measuring the ice with radar, without landing'],['The question','It does not look for life directly: it asks whether the ocean is HABITABLE'],['The plate','It carries the word water engraved in 103 languages, and a poem by Ada Limón']]},
    {t:'RECORD', rows:[['Discovered','1610 · Galileo'],['Surface','The smoothest in the system: almost no craters, young and renewed ice'],['Habitability','With water, energy and chemistry, one of the best candidates for life beyond Earth']]}
  ],
  facts: ['Its ocean holds twice the water of all the seas on Earth, under a shell of ice.', 'The cracks are faults in the ice over the ocean, opened by Jupiter\'s tides.', 'Europa Clipper carries the word water engraved in 103 languages.'],
  fict: '2010 (Arthur C. Clarke): "ALL THESE WORLDS ARE YOURS EXCEPT EUROPA. ATTEMPT NO LANDING THERE."'
},
ganimedes: {
  kind: 'The largest moon in the Solar System',
  quick: [['DIAMETER','5,268 km'],['GRAVITY','0.15 g'],['ORBIT','7.15 d'],['OCEAN','under 150 km of ice'],['MAGNETIC FIELD','its own, unique'],['JUICE','arrives in 2031']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from Jupiter','1.07 million km'],['Year','7.15 days'],['Rotation','Synchronous'],['The dance','In a 1:2:4 resonance with Europa and Io: for each of its laps, Europa does two and Io does four']]},
    {t:'STRUCTURE', rows:[['Size','Larger than Mercury, and larger than Pluto by far'],['The ocean','Salt water under 150 km of ice, possibly holding more water than all the oceans on Earth'],['The core','Liquid iron in motion, and that is what makes the magnetic field'],['The surface','Half dark and cratered, half bright and grooved by ancient faults']]},
    {t:'RECORD', rows:[['1610','Galileo discovers it with the other three, and the sky stops revolving only around the Earth'],['The name','Ganymede, the youth Zeus abducted to serve as cupbearer of the gods'],['1996','Hubble detects a thin oxygen atmosphere'],['2015','The wobble of its auroras confirms the underground ocean: only salt water would explain the pattern'],['2023','Juno passed at 1,000 km and photographed the surface in high resolution'],['JUICE','The European probe launched in 2023 will enter orbit around it in 2034, the first spacecraft to orbit the moon of another planet']]}
  ],
  facts: ['It is the only moon in the Solar System with a magnetic field of its own, and so it has auroras.', 'If it orbited the Sun instead of Jupiter, it would be classified as a planet without argument.', 'The hidden ocean may hold more liquid water than the entire surface of the Earth.', 'It is larger than Mercury, and still almost nobody knows its name.'],
  fict: 'The Expanse: it is the farming breadbasket of the outer planets, and the fight over it drives much of the story.'
},
calisto: {
  kind: 'The most cratered moon, and the most habitable one around Jupiter',
  quick: [['DIAMETER','4,821 km'],['GRAVITY','0.13 g'],['ORBIT','16.7 d'],['CRATERS','record of the system'],['RADIATION','low, outside the belt'],['OCEAN','likely']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from Jupiter','1.88 million km, the farthest of the four big ones'],['Year','16.7 days'],['Rotation','Synchronous'],['Out of the dance','It is the only one of the four outside the resonance, so it is not kneaded by tides']]},
    {t:'STRUCTURE', rows:[['The surface','The most cratered in the whole Solar System: there is no room left for new craters'],['The age','About 4 billion years with practically no change'],['Valhalla','An impact scar with concentric rings spreading over 3,800 km'],['Inside','Rock and ice barely separated, and probably a salty ocean some 150 km down']]},
    {t:'RECORD', rows:[['1610','Discovered by Galileo, the fourth of the Galilean moons'],['The name','Callisto, the nymph Zeus turned into a bear'],['The advantage','It is far enough to escape Jupiter\'s lethal radiation belt'],['The NASA study','A 2003 project pointed to it as the best place for a human base in the Jupiter system'],['JUICE','The European probe will fly by it 21 times from 2031']]}
  ],
  facts: ['It is the most cratered body we know: the surface is saturated, every new impact erases an old one.', 'Unlike its sisters, it escaped the gravitational tug of war and so it stayed geologically still.', 'NASA has studied it as the best address for a crewed base at Jupiter, because the radiation there is bearable.', 'To look at it is to look at a surface practically untouched since the formation of the Solar System.'],
  fict: 'It is the destination of the mission in 2010: The Year We Make Contact, and a recurring base in fiction that takes humans to Jupiter.'
},
amalteia: {
  kind: 'The red potato inside the orbit of Io',
  quick: [['DIMENSIONS','250 × 146 × 128 km'],['GRAVITY','0.002 g'],['ORBIT','11 h 57 min'],['DISCOVERED','1892'],['DISTANCE','181,000 km'],['COLOR','the reddest in the system']],
  sections: [
    {t:'THE LAST BY EYE', rows:[['1892','Discovered by Edward Barnard at the Lick telescope: the last moon found by looking through the eyepiece, without photography'],['After it','Every new moon in the system came from photographic plates or digital cameras'],['The name','The goat (or nymph) who nursed Zeus in Greek mythology']]},
    {t:'THE RED POTATO', rows:[['The color','The reddest object in the Solar System: sulfur spat out by the volcanoes of Io settles on it'],['The density','0.86 g/cm³, less than water: a porous pile of rubble, not a single rock'],['The shape','Elongated and covered in craters, with the long end always pointing at Jupiter']]},
    {t:'RECORD', rows:[['The visit','Galileo passed at 160 km in 2002, in the last maneuver before its final plunge'],['The ring','The dust leaving it forms the faint Amalthea Gossamer ring'],['Where it is','Inside the orbit of Io, in a place of brutal radiation']]}
  ],
  facts: ['It was the last moon in the Solar System discovered by eye, through the telescope eyepiece: after 1892, only photography.', 'It is the reddest known object in the Solar System, painted by the sulfur of Io\'s volcanoes.'],
  fict: 'Arthur C. Clarke set an expedition on it in Jupiter Five (1953), and the Strugatsky brothers wrote The Way to Amalthea (1960).'
},
himalia: {
  kind: 'The largest of Jupiter\'s irregular moons',
  quick: [['DIAMETER','~170 km'],['GRAVITY','0.006 g'],['ORBIT','250.6 d'],['DISCOVERED','1904'],['DISTANCE','11.5 million km'],['TILT','27.5°']],
  sections: [
    {t:'THE CAPTURED ONE', rows:[['Where it came from','Probably a C-type asteroid, dark and gray, captured by Jupiter early in the system'],['The family','It leads the Himalia group: five moons with similar orbits, remains of one shattered body'],['The orbit','Tilted 27.5 degrees and far: 60 times farther than Io']]},
    {t:'THE LARGEST IRREGULAR', rows:[['The size','About 170 km: Jupiter\'s sixth moon by size and the largest outside the four Galileans'],['The surface','Dark, reflecting only 6 percent of the light, like coal'],['The day','It spins in 7.8 hours, unlocked from its orbit, like the rocks of the belt']]},
    {t:'RECORD', rows:[['1904','Discovered by Charles Perrine at Lick Observatory, by photography'],['The visits','Cassini photographed it from afar in 2000, New Horizons in 2007: just an elongated dot'],['The name','A nymph of Rhodes who had three sons with Zeus']]}
  ],
  facts: ['It is the largest moon of Jupiter outside the four Galileans, and probably a captured asteroid.', 'It names a whole family of moons with similar orbits: the pieces of one shattered body.'],
  fict: null
},
tita: {
  kind: 'The other world with rain, rivers and seas',
  quick: [['DIAMETER','5,150 km'],['GRAVITY','0.14 g'],['ORBIT','15.9 d'],['ATMOSPHERE','N₂ · 1.5 atm'],['SEAS','liquid methane'],['DRONE','Dragonfly · 2028']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from Saturn','1.22 million km'],['Year','15.9 days'],['Rotation','Synchronous'],['Temperature','−179 °C, cold enough to freeze chemistry itself']]},
    {t:'STRUCTURE', rows:[['Size','Larger than Mercury, the 2nd largest moon in the Solar System'],['Atmosphere','Dense nitrogen at 1.5 atm, the only moon with a real atmosphere'],['Methane cycle','It evaporates, forms clouds, rains and fills rivers, just like water here'],['Seas','Kraken, Ligeia and Punga Mare, of liquid methane and ethane'],['Underneath','A likely ocean of water and ammonia under the ice crust']]},
    {t:'RECORD', rows:[['Discovered','1655 · Christiaan Huygens'],['The landing','2005: the Huygens probe parachuted down and photographed pebbles rounded by liquid'],['Dragonfly','A nuclear-powered drone with eight rotors that will FLY from dune to dune, hop by hop'],['Launch','July 2028, arrival in 2034, landing in the dunes of Shangri-La'],['Why fly','The atmosphere is dense and the gravity is low: flying there is easier than on Earth']]}
  ],
  facts: ['With the right pressure and low gravity, a human with wings strapped to the arms could fly on Titan.', 'It is the only other known place with stable liquid on the surface, except it is methane, not water.', 'Dragonfly will be the first aircraft to explore another world by hopping from place to place.'],
  fict: 'Gattaca: Vincent\'s dream destination is a mission to Titan. It is also the moon colonized in Titan (2018) and a recurring refuge in science fiction.'
},
reia: {
  kind: 'Saturn\'s second, the one with the thin air',
  quick: [['DIAMETER','1,528 km'],['GRAVITY','0.027 g'],['ORBIT','4.5 d'],['DISCOVERED','1672'],['ATMOSPHERE','O₂ and CO₂, extremely thin'],['TEMP.','−174 °C']],
  sections: [
    {t:'THE THIN AIR', rows:[['The discovery','In 2010 Cassini detected an exosphere of oxygen and carbon dioxide'],['The origin','Saturn\'s radiation breaks the surface ice and frees the O₂'],['The measure','Trillions of times thinner than our air, but it IS an atmosphere'],['The milestone','It was the first time O₂ was detected on an icy world like this']]},
    {t:'RECORD', rows:[['Discovered','1672 · Giovanni Cassini himself'],['The name','Rhea, the titaness mother of Zeus'],['The surface','Dirty, cratered ice, with the bright streaks of ice cliffs'],['The ring mystery','In 2008 Rhea was suspected of having RINGS of its own; Cassini later did not confirm it']]}
  ],
  facts: ['It has an extremely thin oxygen atmosphere, torn from its own ice by Saturn\'s radiation.', 'It was once suspected of having rings of its own, which would make it the only known ringed moon.'],
  fict: 'The suspicion of Rhea\'s rings made headlines about "the moon with rings" before Cassini denied it.'
},
encelado: {
  kind: 'The moon that spits its ocean into space',
  quick: [['DIAMETER','504 km'],['GRAVITY','0.011 g'],['ORBIT','1.37 d'],['GEYSERS','101 jets'],['OCEAN','global, 10 km'],['ALBEDO','0.81 · record']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from Saturn','238,000 km'],['Year','1.37 days'],['Rotation','Synchronous'],['The engine','Saturn\'s tide kneads and stretches the moon, and that friction melts the ice inside']]},
    {t:'STRUCTURE', rows:[['Diameter','504 km, it would fit between London and Paris'],['Ocean','Global, ~10 km deep under 20 km of ice'],['Tiger stripes','Four fissures at the south pole, where the jets come out'],['Temperature','−201 °C on the surface, liquid water below']]},
    {t:'RECORD', rows:[['Discovered','1789 · William Herschel'],['The revelation','2005: Cassini caught plumes of vapor leaving the south pole'],['The plunge','2015: the probe flew THROUGH a jet, 49 km above the surface, and proved the water'],['What it found','Salt, silica from hydrothermal vents, methane and complex organic molecules'],['2023','James Webb saw a plume 10,000 km long, larger than the moon itself'],['Phosphate','2023: phosphorus detected, the last of the six ingredients of life that was missing']]}
  ],
  facts: ['Cassini proved there is an ocean of warm salt water down there, with hydrothermal activity like the vents where life may have started on Earth.', 'The geysers feed Saturn\'s E ring: this moon is literally painting one of the planet\'s rings.', 'It is the most reflective body in the Solar System, returning 81% of the light it receives.', 'A future mission would not even need to land: just fly through the plume and collect the ocean for free.'],
  fict: 'Star Trek: Enterprise makes Enceladus a water refueling stop. In 2017 NASA announced the hydrogen finding with the line that became a meme: "it is food for microbes".'
},
dione: {
  kind: 'The one with the ice cliffs',
  quick: [['DIAMETER','1,123 km'],['GRAVITY','0.024 g'],['ORBIT','2.7 d'],['DISCOVERED','1684'],['ATMOSPHERE','O₂, extremely thin'],['TEMP.','−186 °C']],
  sections: [
    {t:'THE CLIFFS', rows:[['The bright streaks','The bright stripes seen from afar are ice cliffs hundreds of meters tall'],['The origin','Tectonic fractures: Dione\'s crust cracked and exposed clean ice'],['The surprise','Cassini showed that the "dead" moon had active geology'],['The ocean','The gravity field suggests an inner ocean under tens of km of ice']]},
    {t:'RECORD', rows:[['Discovered','1684 · Giovanni Cassini, his fourth at Saturn'],['The name','Dione, titaness mother of Aphrodite'],['The thin air','In 2010 Cassini detected an oxygen exosphere, like Rhea\'s'],['The companions','It shares its orbit with two tiny trojan moons, Helene and Polydeuces']]}
  ],
  facts: ['The bright streaks that puzzled astronomers are ice cliffs exposed by fractures in the crust.', 'It shares its own orbit with two trojan moons, Helene and Polydeuces, one ahead and one behind.'],
  fict: null
},
tetis: {
  kind: 'The almost pure ball of ice',
  quick: [['DIAMETER','1,062 km'],['GRAVITY','0.015 g'],['ORBIT','1.9 d'],['DISCOVERED','1684'],['DENSITY','0.98, almost pure ice'],['TEMP.','−187 °C']],
  sections: [
    {t:'ITHACA CHASMA', rows:[['The canyon','2,000 km long, 100 wide, up to 4 deep'],['The lap','It runs three quarters of the way around the moon'],['The origin','Perhaps the crust cracked when the ancient inner ocean froze and expanded']]},
    {t:'RECORD', rows:[['Discovered','1684 · Giovanni Cassini, in the same year as Dione'],['The Odysseus crater','450 km across, two fifths of the moon\'s diameter'],['The composition','Density 0.98: practically a ball of nearly pure water ice'],['The companions','It shares its orbit with the trojans Telesto and Calypso']]}
  ],
  facts: ['A density of 0.98 makes it practically a ball of nearly pure water ice, lighter than liquid water.', 'The Ithaca Chasma canyon runs three quarters of the way around the moon.'],
  fict: null
},
mimas: {
  kind: 'The small one that looks like the Death Star',
  quick: [['DIAMETER','396 km'],['GRAVITY','0.006 g'],['ORBIT','0.942 d'],['DISCOVERED','1789'],['CRATER','Herschel, 130 km'],['TEMP.','−200 °C']],
  sections: [
    {t:'THE HERSCHEL CRATER', rows:[['The size','130 km across on a 396 km moon: a third of the diameter'],['The impact','A little harder and it would have split Mimas in half; the fractures on the opposite side tell the story'],['The central peak','6 km tall, almost an Everest, in the middle of the scar'],['The famous face','When Voyager 1 showed the crater in 1980, the whole world thought of the same thing']]},
    {t:'THE HIDDEN OCEAN', rows:[['The 2024 surprise','The wobble of its orbit, measured in Cassini data, revealed an inner ocean'],['The depth','The water starts some 20 to 30 km below the ice'],['The youth','The ocean is less than 25 million years old, a newborn on cosmic scales'],['The disguise','The heavily cratered surface shows NO sign of it, which is why nobody suspected']]},
    {t:'RECORD', rows:[['Discovered','1789 · William Herschel'],['The name','Mimas, one of the giants of Greek mythology'],['The composition','Almost pure water ice, density 1.15'],['The neighbor of the rings','It is the large moon closest to the rings, and the Cassini Division is the work of its gravity']]}
  ],
  facts: ['The wobble measured by Cassini revealed in 2024 a young inner ocean, hidden under a surface that shows no sign of it.', 'The Cassini Division, the dark gap in Saturn\'s rings, is opened by the gravity of Mimas.'],
  fict: 'When Voyager 1 photographed the Herschel crater in 1980, three years after Star Wars, the comparison with the Death Star was inevitable and Mimas never shook off the nickname.'
},
hiperion: {
  kind: 'The sponge that spins at random',
  quick: [['DIMENSIONS','360 × 266 × 205 km'],['GRAVITY','0.002 g'],['ORBIT','21.3 d'],['DISCOVERED','1848'],['ROTATION','chaotic'],['DENSITY','0.54 g/cm³']],
  sections: [
    {t:'THE SPONGE', rows:[['The look','Deep craters with thin walls, packed against each other: it looks like a sea sponge'],['Why','Half of the volume is EMPTY: a pile of poorly compacted ice rubble'],['The impact','What hits it sinks in instead of splashing: the craters swallow their own debris']]},
    {t:'THE CHAOTIC SPIN', rows:[['The chaos','It is the only large body known to spin with NO fixed axis or period: every day is different from the last'],['The cause','The potato shape plus the pull of Titan in the 4:3 resonance'],['In practice','It is impossible to predict which side will face Saturn a month from now']]},
    {t:'RECORD', rows:[['Discovered','1848 · Bond, Bond and Lassell'],['The visit','Cassini passed at 500 km in 2005 and took the photos of the sponge'],['Electric charge','In 2005 Cassini took a jolt of electrons coming from it: the first electrostatic moon detected']]}
  ],
  facts: ['Half of Hyperion is empty space: if it fit in a giant ocean, it would float.', 'It is the only large body in the system with CHAOTIC rotation: there is no predicting tomorrow\'s day there.'],
  fict: null
},
japeto: {
  kind: 'The two-faced moon',
  quick: [['DIAMETER','1,469 km'],['GRAVITY','0.023 g'],['ORBIT','79.3 d'],['DISCOVERED','1671'],['ALBEDO','0.04 on the dark side, 0.6 on the bright'],['TEMP.','−143 to −173 °C']],
  sections: [
    {t:'THE TWO FACES', rows:[['The contrast','One hemisphere as dark as coal, the other as bright as snow: the largest brightness contrast in the Solar System'],['The cause','Dark dust from the moon Phoebe falls on the leading side of the orbit'],['The snowball','The darker, the warmer: the ice evaporates and migrates to the bright side, darkening the other even more'],['The solution','The 300-year mystery was closed by Cassini in the 2007 flyby']]},
    {t:'THE EQUATORIAL RIDGE', rows:[['The wall','A mountain range up to 13 km tall running EXACTLY along the equator'],['The extent','1,300 km, a third of the way around the moon'],['The shape','Seen from afar, the ridge gives Iapetus the shape of a walnut'],['The enigma','Nobody knows its origin: maybe an ancient ring that collapsed onto the surface']]},
    {t:'RECORD', rows:[['Discovered','1671 · Giovanni Cassini'],['The vanishing','Cassini noticed the moon disappeared on one side of its orbit: only the dark hemisphere faced us'],['The name','Iapetus, the titan father of Prometheus and Atlas'],['The orbit','79 days, far and tilted: it is the only large moon from which the rings would be seen wide open']]}
  ],
  facts: ['Dust falling on one side and ice migrating to the other make Iapetus the most two-toned world known.', 'A 13 km tall mountain range runs exactly along the equator, and one hypothesis is that it is an ancient ring that collapsed.'],
  fict: 'In the book 2001: A Space Odyssey, by Arthur C. Clarke, the monolith TMA-2 awaits the Discovery on Iapetus; the film moved the destination to Jupiter.'
},
febe: {
  kind: 'The outsider that orbits backwards',
  quick: [['DIAMETER','213 km'],['GRAVITY','0.004 g'],['ORBIT','550.3 d · RETROGRADE'],['DISCOVERED','1899'],['DISTANCE','12.9 million km'],['ALBEDO','0.06']],
  sections: [
    {t:'THE OUTSIDER', rows:[['Where it came from','Almost certainly from the Kuiper belt: a centaur captured by Saturn early in the system'],['The proof','It orbits BACKWARDS relative to everything, tilted, at 12.9 million km: a moon born there would not do that'],['The composition','As dark as coal, with water ice and carbon dioxide of a distant world']]},
    {t:'THE PHOEBE RING', rows:[['The discovery','In 2009 the Spitzer telescope found a GIANT, invisible ring along its orbit'],['The size','Saturn\'s largest ring: it would swallow hundreds of Saturns side by side'],['The link','It is ITS dust that falls on Iapetus and paints the dark hemisphere: the two-face mystery starts here']]},
    {t:'RECORD', rows:[['Discovered','1899 · William Pickering, the first moon found by photography'],['The visit','Cassini passed it on ARRIVAL, in 2004: 2,000 km, before all the others'],['Rotation','9.3 h, unlocked from its orbit: it is not even tidally locked like the real moons']]}
  ],
  facts: ['Phoebe orbits backwards relative to everything at Saturn: it is a captured world from the Kuiper belt.', 'Its dust paints the dark side of Iapetus: the two cards explain each other.'],
  fict: null
},
miranda: {
  kind: '"Frankenstein" moon',
  quick: [['DIAMETER','472 km'],['ORBIT','1.4 d'],['DISCOVERED','1948'],['CLIFF','20 km'],['TEMP.','−187 °C'],['VISIT','Voyager 2, 1986']],
  sections: [
    {t:'THE JIGSAW', rows:[['The look','Terrains that do not match, stitched together like a patchwork quilt'],['The old theory','It would have been shattered by an impact and reassembled wrong'],['The current theory','Partial tidal melting reshaped only some regions'],['Coronae','Three giant oval scars, unique in the solar system']]},
    {t:'VERONA RUPES', rows:[['What it is','A cliff ~20 km tall, the highest in the solar system'],['Comparison','Ten times the Grand Canyon, two Everests stacked'],['The jump','In the weak gravity, the free fall would last some 12 minutes'],['The landing','With a simple airbag you could survive: the fall only builds up to ~200 km/h']]},
    {t:'RECORD', rows:[['Discovered','1948 · Gerard Kuiper'],['Name','Prospero\'s daughter in Shakespeare\'s The Tempest'],['Only visit','Voyager 2, January 1986, at 29,000 km']]}
  ],
  facts: ['Verona Rupes is 20 km tall: jumping from it, the fall would last 12 minutes.', 'It looks reassembled from pieces that do not match, and nobody knows for sure why.'],
  fict: 'Verona Rupes is always cited as the best place in the solar system for a base jump, a classic of science outreach.'
},
ariel: {
  kind: 'The youngest and brightest of the five',
  quick: [['DIAMETER','1,158 km'],['GRAVITY','0.027 g'],['ORBIT','2.52 d'],['DISCOVERED','1851'],['THE VALLEY','Kachina Chasma'],['TEMP.','−213 °C']],
  sections: [
    {t:'THE YOUNGEST FACE OF URANUS', rows:[['What stands out','It is the most reflective of the five large moons: the surface was remade relatively recently'],['The few craters','Almost no large craters: something erased the old ones'],['The valleys','Huge cracks with smooth floors, which look filled by ice that flowed'],['The engine','The tides of Uranus probably heated the interior and melted part of it']]},
    {t:'RECORD', rows:[['Discovered','1851 · William Lassell, on the same night as Umbriel'],['The name','The spirit of the air in Shakespeare\'s The Tempest, like almost every moon of Uranus'],['Only visit','Voyager 2, in January 1986: half of it has never been photographed'],['The climate','One of the coldest places in the solar system, at 213 degrees below zero']]}
  ],
  facts: ['It is the brightest moon of Uranus, with the youngest surface: something erased its old craters.', 'Half of it has never been seen: Voyager 2 only photographed the sunlit hemisphere in 1986.'],
  fict: 'Ariel is the spirit of the air who serves Prospero in The Tempest, and also names a Disney mermaid who has nothing to do with the moon.'
},
umbriel: {
  kind: 'The darkest one, with an unexplained bright ring',
  quick: [['DIAMETER','1,169 km'],['GRAVITY','0.023 g'],['ORBIT','4.14 d'],['DISCOVERED','1851'],['THE MYSTERY','the Wunda crater'],['TEMP.','−214 °C']],
  sections: [
    {t:'THE DARKEST MOON', rows:[['The contrast','It reflects half the light of Ariel while being practically the same size'],['The surface','Covered in ancient craters: nothing erased its past'],['The question','Why did two sister moons, neighbors of the same size, turn out so different?'],['The clue','Maybe it was never tidally heated like Ariel was']]},
    {t:'THE WUNDA RING', rows:[['What it is','A white ring 130 km across on the floor of a crater, near the equator'],['The nickname','It became known as the eye of Umbriel in the only good photo that exists'],['The explanation','Nobody knows: it may be exposed ice or a deposit of bright material'],['The problem','There is only ONE decent image of it, from Voyager 2 in 1986']]}
  ],
  facts: ['It is the darkest moon of Uranus, and nobody knows why it and Ariel, practically twins, turned out so different.', 'It has a white ring 130 km across on the floor of a crater that has never been explained, seen only once in 1986.'],
  fict: 'The name comes from the melancholy spirit in the poem The Rape of the Lock: the somber moon, named to match.'
},
titania: {
  kind: 'The queen of the ice canyons',
  quick: [['DIAMETER','1,578 km'],['GRAVITY','0.037 g'],['ORBIT','8.7 d'],['DISCOVERED','1787'],['CANYON','Messina, 1,500 km'],['TEMP.','−203 °C']],
  sections: [
    {t:'THE CANYONS', rows:[['Messina Chasma','A 1,500 km rift, three times the length of the Grand Canyon'],['The origin','The moon froze from the outside in: the water expanded and cracked the whole shell'],['The CO₂','Dry ice detected on the surface, maybe an extremely thin seasonal atmosphere']]},
    {t:'RECORD', rows:[['Discovered','1787 · William Herschel, in the same year as Oberon'],['The name','The queen of the fairies in A Midsummer Night\'s Dream'],['The tradition','The moons of Uranus are named after Shakespeare and Pope, the only ones outside mythology'],['Only visit','Voyager 2, January 1986']]}
  ],
  facts: ['The largest moon of Uranus froze from the outside in, and the expanding water cracked its shell into 1,500 km canyons.', 'The moons of Uranus are the only ones named outside mythology: the names come from Shakespeare and Alexander Pope.'],
  fict: 'Titania is the queen of the fairies in Shakespeare\'s A Midsummer Night\'s Dream, married to Oberon: the couple names the two largest moons of Uranus.'
},
oberon: {
  kind: 'The old, cratered king',
  quick: [['DIAMETER','1,523 km'],['GRAVITY','0.035 g'],['ORBIT','13.5 d'],['DISCOVERED','1787'],['COLOR','reddish'],['TEMP.','−203 °C']],
  sections: [
    {t:'THE ANCIENT SURFACE', rows:[['The craters','The most battered face among the large moons of Uranus, almost untouched since formation'],['The dark material','The floors of several craters hold a dark material of unknown origin'],['The mountain','A peak of some 6 km stuck out at the edge of the disk in the only close-up photo'],['The color','Reddened by radiation, which has been cooking the ice for billions of years']]},
    {t:'RECORD', rows:[['Discovered','1787 · William Herschel'],['The name','The king of the fairies in A Midsummer Night\'s Dream'],['The farthest','The outermost of the five large ones: 13.5 days per lap'],['Only visit','Voyager 2, January 1986, and never again']]}
  ],
  facts: ['It has the oldest, most cratered face among the large moons of Uranus, almost untouched since the formation of the system.', 'In the only close-up photo, from Voyager 2, a 6 km peak stuck out at the edge of the disk.'],
  fict: 'Oberon is the king of the fairies in Shakespeare\'s A Midsummer Night\'s Dream, husband of Titania: the couple reigns over the two largest moons of Uranus.'
},
tritao: {
  kind: 'Captured moon',
  quick: [['DIAMETER','2,707 km'],['ORBIT','5.9 d'],['DISCOVERED','1846'],['DIRECTION','retrograde'],['TEMP.','−235 °C'],['GEYSERS','active']],
  sections: [
    {t:'THE CAPTURE', rows:[['The clue','RETROGRADE orbit: it goes against Neptune\'s rotation, the only large moon like that'],['The origin','It was born in the Kuiper Belt, a direct cousin of Pluto, and was captured'],['The price','The capture probably destroyed Neptune\'s original moons'],['Discovered','1846 · William Lassell, 17 days after Neptune itself']]},
    {t:'AN ACTIVE WORLD', rows:[['Geysers','Nitrogen jets 8 km tall, seen by Voyager 2 in 1989'],['The surface','Nitrogen ice with a cantaloupe-skin texture, young and renewed'],['Temperature','−235 °C: colder than Pluto, one of the coldest places in the system'],['Atmosphere','Thin, of nitrogen, with clouds and winds']]},
    {t:'THE FATE', rows:[['The spiral','The retrograde orbit shrinks by tides: it slowly falls inward'],['The end','In ~3.6 billion years it crosses the Roche limit and is torn apart'],['The legacy','Neptune will get a giant ring, maybe more spectacular than Saturn\'s']]}
  ],
  facts: ['A Kuiper Belt world "kidnapped" by Neptune, a cousin of Pluto.', 'It is colder than Pluto, and still has active nitrogen geysers.', 'One day it will be torn apart by tides and become a giant ring around Neptune.'],
  fict: 'The only large moon that orbits backwards fascinates writers: it appears from Arthur C. Clarke to games like Destiny.'
},
proteu: {
  kind: 'The dark box that almost became a ball',
  quick: [['DIMENSIONS','424 × 390 × 396 km'],['GRAVITY','0.007 g'],['ORBIT','1.12 d'],['DISCOVERED','1989'],['DISTANCE','118,000 km'],['ALBEDO','0.10']],
  sections: [
    {t:'NEPTUNE\'S SECOND', rows:[['The size','About 420 km: the second largest moon of Neptune, and nobody knew about it until Voyager 2 arrived'],['The shape','A box with rounded corners: it is close to the largest size a body can have without gravity rounding it'],['The darkness','It reflects only 10 percent of the light: one of the darkest objects in the system']]},
    {t:'THE ORBIT', rows:[['Where it is','At 118,000 km, inside the orbit of Triton, going around in 27 hours'],['The rotation','Synchronous: it always shows the same face to Neptune'],['The origin','It probably re-formed from the debris that Triton\'s capture scattered']]},
    {t:'RECORD', rows:[['1989','Discovered in the images of Voyager 2, the only probe that ever passed Neptune'],['Pharos','The 230 km crater, more than half the moon\'s diameter'],['The name','The shape-shifting sea god, shepherd of Poseidon\'s seals']]}
  ],
  facts: ['It is the second largest moon of Neptune and stayed hidden until 1989, because it is as dark as coal and glued to the planet\'s glare.', 'It has nearly the largest size a body can have without its own gravity rounding it.'],
  fict: null
},
nereida: {
  kind: 'The moon with the most eccentric orbit known',
  quick: [['DIAMETER','~340 km'],['GRAVITY','0.007 g'],['ORBIT','360.1 d'],['DISCOVERED','1949'],['DISTANCE','1.4 to 9.7 million km'],['ECCENTRICITY','0.75']],
  sections: [
    {t:'THE WILD ORBIT', rows:[['The eccentricity','0.75: the most eccentric of all known moons, almost a comet'],['The back and forth','It comes within 1.4 million km of Neptune and swings out to 9.7 million, every 360-day lap'],['The cause','Triton\'s capture probably shook its orbit into this shape']]},
    {t:'NEPTUNE\'S THIRD', rows:[['The size','About 340 km, Neptune\'s third moon by size'],['The surface','Neutral gray, with water ice; the brightness varies and nobody knows the rotation period for sure'],['The visit','Voyager 2 passed 4.7 million km away in 1989: only a blur of a few pixels']]},
    {t:'RECORD', rows:[['1949','Discovered by Gerard Kuiper by photography, 103 years after Triton'],['Until 1989','It was Neptune\'s second and last known moon for four decades'],['The name','The Nereids, the fifty sea nymphs of Greek mythology']]}
  ],
  facts: ['It has the most eccentric orbit of all known moons: its distance to Neptune varies sevenfold in a single lap.', 'For forty years, from 1949 to 1989, Neptune had only two known moons: Triton and this one.'],
  fict: null
},
caronte: {
  kind: 'Binary moon',
  quick: [['DIAMETER','1,212 km'],['ORBIT','6.4 d'],['DISCOVERED','1978'],['SYSTEM','binary']],
  sections: [
    {t:'RECORD', rows:[['Discovered','1978 · James Christy'],['Proportion','Half the diameter of Pluto'],['Rotation','Mutually synchronous, each always faces the other'],['Mordor Macula','The dark reddish patch at the north pole']]}
  ],
  facts: ['The center of mass lies OUTSIDE Pluto: technically the two orbit a point in space.'],
  fict: null
},
estige: {
  kind: 'The smallest and innermost of the little ones',
  quick: [['DIMENSIONS','16 × 9 × 8 km'],['ORBIT','20.2 d'],['DISCOVERED','2012'],['DISTANCE','42,656 km'],['ROTATION','chaotic'],['PHOTO','New Horizons, 2015']],
  sections: [
    {t:'THE LAST ONE FOUND', rows:[['2012','Discovered by Hubble in the survey preparing for New Horizons\' arrival: the team was looking for moons that could be a collision hazard'],['The size','Some 16 km on its longest side, the smallest known moon of Pluto'],['The orbit','The innermost of the little ones, at 42,000 km, going around in 20 days']]},
    {t:'THE FOUR LITTLE ONES', rows:[['The dance','Styx, Nix, Kerberos and Hydra spin CHAOTICALLY: the double pull of Pluto and Charon prevents a regular day'],['The resonance','The orbits of the four fall into near-integer ratios with Charon\'s (3, 4, 5 and 6 laps)'],['The origin','Probably the debris of the giant impact that formed Charon']]},
    {t:'RECORD', rows:[['The name','The river that separated the world of the living from Hades, keeping Pluto\'s underworld theme'],['The visit','New Horizons photographed it in July 2015: an elongated grain a few pixels wide']]}
  ],
  facts: ['It is the smallest known moon of Pluto, some 16 km, found only in 2012 while Hubble looked for hazards to New Horizons.', 'It spins chaotically: with two large bodies pulling, none of the four little moons has a regular day.'],
  fict: null
},
nix: {
  kind: 'The little one with the red spot',
  quick: [['DIMENSIONS','50 × 33 × 31 km'],['ORBIT','24.9 d'],['DISCOVERED','2005'],['DISTANCE','48,694 km'],['ROTATION','chaotic'],['SPOT','red, a crater']],
  sections: [
    {t:'THE DISCOVERY', rows:[['2005','Found by Hubble together with Hydra, by the team preparing New Horizons'],['The name','Nyx, the Greek goddess of the night and mother of Charon; spelled with an i to avoid confusion with asteroid 3908 Nyx'],['The pair','It and Hydra were the first new moons of Pluto since Charon, in 1978']]},
    {t:'THE SPOT', rows:[['The color','Light gray, with a large REDDISH spot that is an impact crater'],['The size','Some 50 km on its longest side, the second of the little ones'],['The rotation','Chaotic: in 2015 it measured a 43-hour day, but that changes all the time']]},
    {t:'RECORD', rows:[['The visit','New Horizons passed 23,000 km away in 2015 and showed the elongated shape and the spot'],['The surface','Relatively clean water ice, reflecting light well']]}
  ],
  facts: ['It has a large reddish spot, a crater, on a world of light gray ice.', 'Like all of Pluto\'s little moons, it spins chaotically: there is no predicting which side will face the planet.'],
  fict: null
},
cerbero: {
  kind: 'The two-lobed watchdog',
  quick: [['DIMENSIONS','19 × 10 × 9 km'],['ORBIT','32.2 d'],['DISCOVERED','2011'],['DISTANCE','57,783 km'],['ROTATION','chaotic'],['SHAPE','two lobes']],
  sections: [
    {t:'THE SURPRISE', rows:[['The prediction','Before New Horizons, it was thought to be a large, very dark moon, given how little light it reflected'],['The reality','It is small and BRIGHT: 19 km, with two lobes stuck together, like two snowballs glued'],['The lesson','Reflecting little light in total could mean big and dark or small and bright; small won']]},
    {t:'THE ORBIT', rows:[['Where it is','Between Nix and Hydra, at 58,000 km, in 32 days'],['The dance','Chaotic rotation, like its little sisters, because of the Pluto-Charon pair']]},
    {t:'RECORD', rows:[['2011','Discovered by Hubble, in the safety survey for the probe\'s arrival'],['The name','The three-headed dog that guards the entrance to the underworld']]}
  ],
  facts: ['Everyone expected a large, dark moon; New Horizons showed a small, bright, two-lobed one.', 'It was found in 2011 by Hubble while the team searched for hazards on New Horizons\' path.'],
  fict: null
},
hidra: {
  kind: 'The outermost and brightest of the little ones',
  quick: [['DIMENSIONS','51 × 36 × 31 km'],['ORBIT','38.2 d'],['DISCOVERED','2005'],['DISTANCE','64,738 km'],['ROTATION','chaotic · 10 h'],['SURFACE','clean water ice']],
  sections: [
    {t:'THE BRIGHTEST', rows:[['The surface','Almost pure water ice, reflecting more light than any other of the little ones'],['The size','Some 51 km on its longest side, tied with Nix as the largest of the four'],['The rotation','The fastest in the Pluto system: a day of about 10 hours, and chaotic']]},
    {t:'THE ORBIT', rows:[['Where it is','The outermost of the five moons, at 65,000 km, in 38 days'],['The resonance','Nearly 6 laps of Charon for each of its own']]},
    {t:'RECORD', rows:[['2005','Discovered by Hubble together with Nix'],['The name','The many-headed serpent, guardian of Hades, keeping the underworld theme'],['The visit','New Horizons photographed it in 2015 from 230,000 km, showing the bean shape']]}
  ],
  facts: ['It is Pluto\'s brightest moon: almost pure water ice, like fresh snow.', 'It spins in about 10 hours, the fastest day in the whole Pluto system, and chaotic on top of that.'],
  fict: null
},
apollo8: {
  kind: 'The first humans to leave the Earth',
  quick: [['LAUNCH','12/21/1968'],['CREW','Borman · Lovell · Anders'],['LUNAR ORBITS','10, on Christmas Eve'],['FIRST TIME','humans beyond Earth orbit'],['THE PHOTO','Earthrise, 12/24/1968'],['RETURN','12/27/1968']],
  sections: [
    {t:'THE MISSION', rows:[['The boldness','The lunar module was not ready, and NASA decided to go anyway: straight to lunar orbit'],['The first','Borman, Lovell and Anders: the first humans to leave Earth\'s gravity'],['The far side','The first human EYES to see the side the Earth never sees'],['Christmas','Ten laps around the Moon on Christmas Eve 1968']]},
    {t:'EARTHRISE', rows:[['The moment','On the 4th lap, Anders saw the Earth rising over the lunar horizon and scrambled for the color film'],['The photo','The blue Earth, small and whole, floating over a dead gray ground'],['The effect','It is cited as the portrait that helped found the environmental movement'],['The irony','They went to the Moon and the discovery was the Earth']]},
    {t:'RECORD', rows:[['The reading','On Christmas Eve the crew read from Genesis live to the largest audience in history until then'],['The telegram','After a year of wars and assassinations, an anonymous person wrote to NASA: you saved 1968'],['The path','The route and the lunar insertion of Apollo 8 opened the door to the Apollo 11 landing']]}
  ],
  facts: ['They were the first humans to leave Earth\'s gravity and to see the far side of the Moon with their own eyes.', 'The Earthrise photo, taken on the fourth orbit, is cited as the portrait that helped found the environmental movement.', 'The Genesis reading on Christmas Eve was the most watched broadcast in history up to that moment.'],
  fict: '1968 had been so hard that an anonymous person sent NASA a telegram: thank you, Apollo 8, you saved 1968.'
},
apollo11: {
  kind: 'The Saturn V that took humanity to the Moon',
  quick: [['LAUNCH','7/16/1969'],['SIZE','110 m, the Saturn V'],['CREW','Armstrong · Aldrin · Collins'],['LANDING','7/20/1969, Sea of Tranquility'],['ON THE SURFACE','21 h 36 min'],['RETURN','7/24/1969']],
  sections: [
    {t:'THE MISSION, DAY BY DAY', rows:[['7/16','Launch from Kennedy at 9:32; three hours later, translunar injection'],['7/17 to 7/18','Outbound cruise with a single course correction'],['7/19','Entry into lunar orbit, 30 laps begin'],['7/20','The Eagle descends: "Houston, the Eagle has landed". The step comes at night'],['7/21','Liftoff from the Moon and rendezvous with Collins in the Columbia'],['7/22 to 7/23','The way back, with TV broadcasts to the world'],['7/24','Reentry and splashdown in the Pacific, 8 days later']]},
    {t:'THE SATURN V', rows:[['The size','110 meters, a 36-story building rising whole'],['The power','The most powerful rocket ever launched until Starship, half a century later'],['The engines','Five F-1s burning 13 tonnes of fuel PER SECOND'],['Position here','Symbolic: the real route was Earth, lunar orbit, Sea of Tranquility']]},
    {t:'THE LANDING', rows:[['The Eagle','Armstrong took manual control with alarms sounding and boulders on the target'],['The fuel','It landed with about 25 seconds of margin in the tank'],['The line','"One small step for a man, one giant leap for mankind"'],['The audience','600 million people watching live, the absolute record of the time']]},
    {t:'RECORD', rows:[['The computer','Less memory than a pocket calculator, and it was enough'],['The flag','It fell with the blast of the Eagle\'s liftoff; Aldrin saw it through the window'],['The return','Splashdown in the Pacific and a 21-day quarantine against "lunar germs"']]}
  ],
  facts: ['The onboard computer had 72 kB: your microwave has more.', 'Armstrong landed manually with 25 seconds of fuel to spare.', '600 million people stopped to watch, almost a quarter of humanity in 1969.'],
  fict: 'From 2001 to First Man, it is the most filmed event of the space age, and the conspiracy theories about it became a cultural joke.'
},
apollo13: {
  kind: 'The most successful failure in history',
  quick: [['LAUNCH','4/11/1970'],['THE EXPLOSION','4/13, O₂ tank'],['CREW','Lovell · Swigert · Haise'],['THE ROUTE','free return around the Moon'],['SPLASHDOWN','4/17/1970'],['OUTCOME','everyone alive']],
  sections: [
    {t:'THE MISSION, DAY BY DAY', rows:[['4/11','Launch at 13:13; an engine shuts down early, but the route holds'],['4/13','The O₂ tank explodes 330,000 km out: "Houston, we\'ve had a problem"'],['4/14','The crew moves into the lunar module and swings around the Moon'],['4/15 to 4/16','Cold of 4 °C, rationed water and the CO₂ filter improvisation'],['4/17','A 6-minute silent reentry and splashdown: everyone alive']]},
    {t:'HOUSTON, WE\'VE HAD A PROBLEM', rows:[['4/13/1970','An oxygen tank explodes 330,000 km from Earth'],['The real line','"Houston, we\'ve had a problem", in the past tense; Lovell corrected everyone'],['The decision','No fuel to turn around: the route was to swing AROUND the Moon'],['The lifeboat','The crew moved into the lunar module, designed for 2 people for 2 days']]},
    {t:'THE IMPROVISATION', rows:[['The CO₂','Square filters in round sockets: duct tape, a sock and the cover of a manual'],['The cold','4 °C, sweating walls, almost no water or power'],['The return','Course corrections by eye, aiming at the Earth through the window'],['4/17','Perfect splashdown in the Pacific: the whole world breathed']]}
  ],
  facts: ['The explosion happened 330,000 km from home, and still everyone came back alive.', 'The CO₂ filter fix used duct tape, a sock and the cover of a manual.', 'They hold the record for distance from Earth: 400,171 km, swinging around the Moon.'],
  fict: 'The 1995 film with Tom Hanks immortalized the line in the present tense, "Houston, we have a problem", and Lovell kept correcting: it was in the past tense.'
},
apollo17: {
  kind: 'The farewell to the Moon',
  quick: [['LAUNCH','12/7/1972, the only night launch'],['CREW','Cernan · Evans · Schmitt'],['ON THE SURFACE','3 days and 3 moonwalks'],['THE SCIENTIST','Schmitt, the first geologist on the Moon'],['THE ROVER','35.7 km driven'],['RETURN','12/19/1972']],
  sections: [
    {t:'THE FAREWELL', rows:[['The mission','The longest and most scientific: 3 days in the Taurus-Littrow valley'],['The geologist','Harrison Schmitt, the first and only scientist to walk on the Moon'],['The rover','35.7 km on the rover, the lunar driving record to this day'],['The last step','Gene Cernan climbed the ladder last on 12/14/1972: nobody has gone back since']]},
    {t:'BLUE MARBLE', rows:[['The photo','On the way to the Moon, the crew photographed the WHOLE Earth fully lit'],['The portrait','The Blue Marble became one of the most reproduced images in history'],['The pair','Earthrise (1968) opened the era; Blue Marble (1972) closed it']]},
    {t:'RECORD', rows:[['The line','Cernan: we leave as we came and, God willing, as we shall return, with peace and hope for all mankind'],['The samples','110 kg of rocks, including the orange soil that puzzled the geologists'],['The legacy','The end of the program: Artemis is the attempt to reopen the door']]}
  ],
  facts: ['Gene Cernan was the last human being to walk on the Moon, in December 1972: nobody has gone back since.', 'The Blue Marble photo, the whole Earth fully lit, was taken on the way to the Moon on this mission.', 'Harrison Schmitt was the first and only scientist, a geologist, to walk on the Moon.'],
  fict: 'Cernan\'s farewell line still closes documentaries today, and the orange soil of Taurus-Littrow became legend among geologists.'
},
artemis1: {
  kind: 'The return of the road to the Moon, with nobody aboard',
  quick: [['LAUNCH','11/16/2022'],['ROCKET','SLS Block 1, 98 m'],['CAPSULE','Orion'],['CREW','mannequins Campos, Helga and Zohar'],['DURATION','25.5 days'],['RECORD','432,000 km from Earth']],
  sections: [
    {t:'THE MISSION', rows:[['The test','The first flight of the SLS with Orion: everything new, nobody aboard'],['The route','A distant RETROGRADE orbit around the Moon: wide, stable and economical'],['The record','432,000 km from Earth: no spacecraft built for people has gone so far'],['The return','Reentry at 40,000 km/h testing the heat shield, splashdown in the Pacific']]},
    {t:'RECORD', rows:[['The commander','The mannequin Moonikin Campos, a tribute to Arturo Campos, the engineer who helped save Apollo 13'],['The passengers','Helga and Zohar, torsos that measured radiation for future crews'],['The legacy','It opened the way: Artemis II takes people down the same corridor']]}
  ],
  facts: ['The capsule went farther than any spacecraft built for humans: 432,000 km from Earth.', 'The commander was a mannequin named after the engineer who helped save Apollo 13.'],
  fict: 'The plush Snoopy floating in the cabin served as the official zero-gravity indicator.'
},
artemis2: {
  kind: 'The first humans bound for the Moon since 1972',
  quick: [['STATUS','awaiting launch'],['CREW','Wiseman · Glover · Koch · Hansen'],['PROFILE','free-return flyby'],['DURATION','~10 days'],['ROCKET','SLS Block 1'],['CAPSULE','Orion']],
  sections: [
    {t:'THE MISSION', rows:[['The plan','A FREE-RETURN flyby of the Moon: the same safety route that saved Apollo 13'],['The crew','Reid Wiseman, Victor Glover, Christina Koch and Jeremy Hansen'],['The firsts','Koch: the first woman on a lunar mission; Hansen: the first non-American'],['What it tests','Orion with people aboard, life support and the path for Artemis III']]},
    {t:'RECORD', rows:[['No landing','This mission swings around the Moon and comes back: the landing is left to Artemis III'],['The far side','The crew will see the side the Earth never sees, like Apollo 8 in 1968'],['The timeline here','PLANNED mission profile; the final dates depend on the launch']]}
  ],
  facts: ['It will be the first crewed mission bound for the Moon since Apollo 17, in 1972.', 'Christina Koch will be the first woman and Jeremy Hansen the first non-American to travel to the Moon.'],
  fict: 'The four became celebrities at the 2023 announcement: the first lunar cast presented to the world in half a century.'
},
luna9: {
  kind: 'The first soft landing on another world',
  quick: [['LAUNCH','1/31/1966'],['COUNTRY','Soviet Union'],['LANDING','2/3/1966, the FIRST soft one'],['MASS','99 kg on the ground'],['THE PHOTOS','the first FROM the surface'],['TRANSMISSIONS','3 days of panoramas']],
  sections: [
    {t:'THE PROOF', rows:[['The fear','Until then, it was feared the lunar soil was a treacherous dust that would swallow any craft'],['The answer','Luna 9 landed, did NOT sink, and proved you can stand on the Moon'],['The technique','An ejected capsule that bounced like a ball and opened up in petals'],['The feat','Humanity\'s first soft landing on ANOTHER WORLD']]},
    {t:'RECORD', rows:[['The photos','The first images taken FROM the surface of another celestial body'],['The leak','England\'s Jodrell Bank observatory intercepted the signal and the newspapers published the photos BEFORE the Soviets'],['The context','Three years before Apollo 11: the race was fierce'],['The route here','Direct descent, no orbit: the mission ENDS on the lunar ground']]}
  ],
  facts: ['It was humanity\'s first soft landing on another world, and it proved the lunar soil holds weight.', 'Jodrell Bank observatory intercepted the signal and the British newspapers published the photos before the Soviet Union itself.'],
  fict: 'The Daily Express splashed the stolen photos of the Moon on its front page, and the USSR learned from the press that the world had already seen them.'
},
luna16: {
  kind: 'The Moon delivered by a robot',
  quick: [['LAUNCH','9/12/1970'],['COUNTRY','Soviet Union'],['SAMPLE','101 g of lunar soil'],['THE FIRST','automatic sample return in history'],['DRILLING','35 cm in the Sea of Fertility'],['RETURN','9/24/1970']],
  sections: [
    {t:'THE ROBOT THAT BROUGHT THE MOON', rows:[['The feat','It landed, drilled, stored 101 grams and BROUGHT them back, all without people'],['The context','One year after Apollo 11: the Soviet answer was to prove the robotic path'],['The drill','35 cm of drilling in the Sea of Fertility'],['The return','The capsule parachuted down onto the Kazakh steppe']]},
    {t:'RECORD', rows:[['The legacy','The robotic path of Luna 16 is the same one China retraced with the Chang\'e missions'],['The exchange','Years later, the USSR and NASA swapped samples: grams from Luna for grams from Apollo'],['The route here','Orbit, landing, liftoff of the ascent stage only, and the trip back']]}
  ],
  facts: ['The first mission in history to land on another world and BRING a sample back with no crew at all.', 'The USSR and NASA ended up swapping samples: grams from Luna 16 for grams from the Apollo missions.'],
  fict: 'The 101 grams became stamps, museum pieces and even auctions: in 2018 three tiny grains from Luna 16 sold for 855,000 dollars.'
},
change4: {
  kind: 'The first landing on the far side',
  quick: [['LAUNCH','12/8/2018'],['COUNTRY','China'],['LANDING','1/3/2019, the first on the FAR SIDE'],['ROVER','Yutu-2, the longest-lived on the Moon'],['THE BRIDGE','the Queqiao satellite, behind the Moon'],['THE SPROUT','the first plant to sprout on the Moon']],
  sections: [
    {t:'THE FAR SIDE', rows:[['The problem','The far side does NOT see the Earth: no radio signal reaches it directly'],['The bridge','The Queqiao satellite, hovering BEHIND the Moon, relays every message'],['The place','Von Kármán crater, inside the South Pole-Aitken basin: the largest impact basin in the system'],['The wait','Weeks in orbit waiting for the SUN to rise on the far side to land in daylight']]},
    {t:'RECORD', rows:[['The rover','Yutu-2, the Jade Rabbit: it became the longest-lived rover in lunar history'],['The sprout','A cotton seed SPROUTED aboard: the first living thing to be born on another world (the lunar night took it)'],['The names','Chang\'e is the goddess of the Moon; Yutu, the rabbit who lives with her'],['The trio of eras','Luna opened the way, Apollo took people, Chang\'e landed where nobody could see']]}
  ],
  facts: ['It was the first landing in history on the far side of the Moon, possible only with a relay satellite hovering behind it.', 'A cotton seed sprouted aboard: the first living thing to be born on another world.', 'The Yutu-2 rover became the longest-lived in lunar history.'],
  fict: 'Chang\'e is the goddess who lives on the Moon with the rabbit Yutu in Chinese mythology: the mission took both back home.'
},
slim: {
  kind: 'The sharpshooter that landed on its feet... almost',
  quick: [['LAUNCH','9/7/2023'],['COUNTRY','Japan (JAXA)'],['PRECISION','landed 55 m from the target'],['THE TUMBLE','nose down, and it worked'],['SURVIVED','3 lunar nights'],['ROVERS','LEV-1 and the spherical SORA-Q']],
  sections: [
    {t:'THE SHARPSHOOTER', rows:[['The goal','To land within 100 m of the target, when missing by kilometers was normal'],['The result','55 meters: the era of surgical landings began'],['The tumble','An engine failed at the end and it stopped NOSE down on the ground, and still worked'],['The route','4 months on a fuel-saving trajectory to lunar orbit']]},
    {t:'RECORD', rows:[['The survival','Designed for ONE lunar night, it endured three, at −170 °C'],['The robots','The hopping LEV-1 and SORA-Q, a sphere that opens into a rover'],['The toy','SORA-Q was made with Takara Tomy, the maker of Transformers'],['The club','Japan became the 5th country to soft-land on the Moon']]}
  ],
  facts: ['It landed 55 meters from the target, when missing by kilometers was normal: the first precision landing on the Moon.', 'An engine failed, it stopped upside down, and still it completed its mission and survived three lunar nights.'],
  fict: 'The spherical rover SORA-Q was created with Takara Tomy, the maker of Transformers: a real toy exploring the Moon.'
},
/* ---- fase 2, parte 3 (r239): sondas, satelites, cometas, visitantes e regioes ---- */
viking1: {
  kind: 'The first photo of the ground of Mars',
  quick: [['LAUNCH','8/20/1975'],['LANDING','7/20/1976, 7 years after Apollo 11'],['THE FIRST','photo of the Martian surface'],['THE SEARCH','4 life experiments aboard'],['LASTED','6 years on the ground (plan: 90 days)'],['THE PAIR','Viking 2 landed 6 weeks later']],
  sections: [
    {t:'THE PIONEER', rows:[['The feat','The first American landing on Mars, and the first PHOTO of the Martian ground'],['The date','July 20, 1976: exactly seven years after the Apollo 11 landing'],['The duo','An orbiter mapping from above and the lander working on the ground'],['The lifetime','Planned for 90 days, it transmitted for SIX YEARS']]},
    {t:'THE SEARCH FOR LIFE', rows:[['The experiments','Four biological tests, the first ever run on another planet'],['The result','One of them came back POSITIVE, the others did not: the debate lasts to this day'],['The lesson','Mars does not give easy answers: that is why the rovers keep going'],['The legacy','Every modern Mars mission descends from Viking']]}
  ],
  facts: ['It took the first photo of the surface of Mars, exactly seven years after the Apollo 11 landing.', 'One of the four life experiments came back positive, and the scientific debate lasts to this day.', 'Planned for 90 days, it worked for six years on the ground.'],
  fict: 'The ambiguous result of the life experiment has fed books for half a century: what if it found it, and nobody believed?'
},
cassini: {
  kind: 'The queen of Saturn and the final plunge',
  quick: [['LAUNCH','10/15/1997'],['ARRIVAL','7/1/2004, 7 years of travel'],['AT SATURN','13 years and 294 orbits'],['THE PASSENGER','ESA\'s Huygens probe'],['DISCOVERIES','Enceladus geysers, Titan seas'],['THE END','9/15/2017, deliberate plunge']],
  sections: [
    {t:'THE QUEEN OF SATURN', rows:[['The trip','7 years and two swings past Venus to gain speed'],['The reign','13 years orbiting Saturn: rings, storms and 6 new moons'],['The passenger','It carried Huygens, which parachuted down onto TITAN in 2005'],['The jewels','The geysers of Enceladus and the methane seas of Titan are hers']]},
    {t:'THE GRAND FINALE', rows:[['The decision','Out of fuel, it could not risk falling onto Enceladus or Titan and contaminating them'],['The plunge','22 orbits INSIDE the rings and the final dive into the atmosphere'],['The end','9/15/2017: Cassini became part of the planet it studied'],['The photo','In 2013 it photographed the Earth through the rings: the Day the Earth Smiled']]}
  ],
  facts: ['It spent 13 years at Saturn and discovered the geysers of Enceladus and the methane seas of Titan.', 'The final plunge was an act of planetary protection: it could not contaminate the ocean moons.', 'In 2013 it photographed the Earth through the rings while the world waved: the Day the Earth Smiled.'],
  fict: 'The Grand Finale gave the world a collective mourning for a robot: the farewell went around the planet in 2017.'
},
pathfinder: {
  kind: 'The first rover on Mars',
  quick: [['LAUNCH','12/4/1996'],['LANDING','7/4/1997, Ares Vallis'],['THE TRICK','airbags: it bounced 15 times'],['THE ROVER','Sojourner, 10.6 kg'],['DURATION','83 days (plan: 7)'],['SPEED','40,000 km/h in cruise']],
  sections: [
    {t:'THE CHEAP MISSION', rows:[['The bet','To prove you could land on Mars SPENDING LITTLE: it cost 1/15 of the Vikings'],['The airbags','No retrorockets to the end: the craft bounced 15 times wrapped in air bags'],['The rover','Sojourner, the size of a microwave oven, the FIRST to roll on another planet'],['The place','Ares Vallis, an ancient flood plain full of varied rocks']]},
    {t:'RECORD', rows:[['The internet','The photos crashed NASA\'s servers: it was the first big space event of the web'],['The names','The base became the Carl Sagan Memorial Station; the rocks got cartoon names'],['The duration','Planned for 7 days, it lasted 83'],['The legacy','It opened the road for the rovers: Spirit, Opportunity, Curiosity and Perseverance']]}
  ],
  facts: ['It landed bouncing 15 times inside airbags, with no retrorocket at all in the final contact.', 'The 10.6 kg Sojourner was the first rover to roll on another planet.', 'The photos crashed NASA\'s servers in 1997: the first space event of the internet age.'],
  fict: 'In The Martian, Watney digs up Pathfinder to talk to Earth: the probe became a movie character.'
},
voyager1: {
  kind: 'The most distant human-made object',
  quick: [['LAUNCH','9/5/1977'],['DISTANCE','~168 AU'],['SPEED','61,000 km/h'],['WHERE','interstellar space'],['POWER','until ~2030'],['SIZE','3.7 m antenna']],
  sections: [
    {t:'WHERE IT IS', rows:[['Distance','About 168 AU from the Sun, growing 3.6 AU per year'],['The signal','It takes more than 23 hours to reach us, and another 23 to go back'],['The power','Its radio reaches here with less energy than a digital watch'],['Position here','Symbolic: at real scale it would be far beyond the edge of this scene']]},
    {t:'THE JOURNEY', rows:[['1979','Flies by Jupiter and discovers the volcanoes of Io'],['1980','Passes Saturn and Titan, which threw it out of the plane of the planets'],['1990','Turns its camera and photographs the Pale Blue Dot, at Carl Sagan\'s request'],['2012','Crosses the heliopause and becomes the first human object in interstellar space'],['~2030','The nuclear batteries fade and it sails on, silent forever']]},
    {t:'THE GOLDEN RECORD', rows:[['What it is','A gold-plated copper disc with sounds and images of Earth'],['The content','Greetings in 55 languages, rain, a heartbeat, Bach, Chuck Berry and a Navajo chant'],['Brazil','It has a greeting in Portuguese, "Tchau, pessoal" (bye, everyone)'],['The shelf life','The record was made to last a billion years'],['The odds','It will not get close to any star for 40,000 years']]}
  ],
  facts: ['It is the most distant object humanity has ever built, and it keeps moving away at 61,000 km/h.', 'Its signal takes more than 23 hours to get here, traveling at the speed of light.', 'It carries a golden record with sounds of Earth, made to last a billion years.', 'It took the Pale Blue Dot photo, with the Earth taking up less than a pixel.'],
  fict: 'The Golden Record became a cultural symbol, and the probe appears from Star Trek to countless stories about what to say to an alien.'
},
voyager2: {
  kind: 'The only one to visit all four giants',
  quick: [['LAUNCH','8/20/1977'],['DISTANCE','~140 AU'],['SPEED','55,000 km/h'],['WHERE','interstellar space'],['RECORD','4 giants'],['POWER','until ~2030']],
  sections: [
    {t:'WHERE IT IS', rows:[['Distance','About 140 AU, in a different direction from its sister'],['2018','It crossed the heliopause, six years after Voyager 1'],['Position here','Symbolic, like its sister\'s']]},
    {t:'THE GRAND TOUR', rows:[['The alignment','An arrangement of the planets that happens every 175 years allowed visiting four in a single flight'],['1979 and 1981','Jupiter and Saturn'],['1986','Uranus, and to this day it is the only spacecraft that has been there'],['1989','Neptune, and it discovered the geysers of Triton'],['The legacy','Almost everything we know about Uranus and Neptune up close came from these few hours of flyby']]}
  ],
  facts: ['It is the only spacecraft that has visited Uranus and Neptune, and it will probably remain so for decades.', 'The planetary alignment that made its trip possible only repeats every 175 years.', 'It also carries a Golden Record, identical to its sister\'s.'],
  fict: 'Its mission is the classic example of seizing an astronomical window: whoever missed it waited two centuries.'
},
newhorizons: {
  kind: 'The one that finally showed Pluto',
  quick: [['LAUNCH','1/19/2006'],['DISTANCE','~62 AU'],['SPEED','52,000 km/h'],['PLUTO','7/14/2015'],['ARROKOTH','1/1/2019'],['POWER','until ~2040']],
  sections: [
    {t:'THE JOURNEY', rows:[['The start','It left Earth at 58,000 km/h, the fastest launch in history'],['2015','It passed 12,500 km from Pluto after nine and a half years of travel'],['What it found','Mountains of water ice, a heart-shaped nitrogen plain and a blue atmosphere'],['2019','It flew by Arrokoth, the most distant object ever visited up close'],['Today','It keeps sending data from the Kuiper belt']]},
    {t:'THE HUMAN DETAIL', rows:[['Aboard','It carries part of the ashes of Clyde Tombaugh, who discovered Pluto in 1930'],['The irony','He died in 1997, before Pluto was demoted, and before anyone finally saw it up close'],['The time','The full flyby imagery took 15 months to transmit to Earth']]}
  ],
  facts: ['It carries the ashes of the man who discovered Pluto, who died without ever seeing the planet up close.', 'Before it, Pluto was just a blur of a few pixels, even in Hubble.', 'It took fifteen months to send back all the photos of that single flyby day.'],
  fict: 'The nitrogen heart of Pluto that it photographed became one of the most recognizable planetary images of the century.'
},
pioneer10: {
  kind: 'The first to cross the belt',
  quick: [['LAUNCH','3/2/1972'],['DISTANCE','~140 AU'],['LAST SIGNAL','1/23/2003'],['MILESTONE','1st at Jupiter'],['PLAQUE','yes'],['HEADING','Aldebaran']],
  sections: [
    {t:'THE JOURNEY', rows:[['1972','The first spacecraft to cross the asteroid belt, which many feared was impassable'],['1973','The first to reach Jupiter, and to measure the lethal radiation around it'],['2003','The last faint signal was received, 12 billion km away'],['Today','It sails on silently toward Aldebaran, arriving in 2 million years']]},
    {t:'THE PLAQUE', rows:[['What it is','A gold-anodized aluminum plaque with a man, a woman and a map to Earth'],['Who made it','Carl Sagan, Frank Drake and Linda Salzman Sagan, in three weeks'],['The map','The position of the Sun relative to 14 pulsars, an address that works for millions of years'],['The controversy','The nudity of the drawings drew complaints in American newspapers at the time']]}
  ],
  facts: ['It proved the asteroid belt can be crossed, opening the way for everything that came after.', 'The plaque aboard gives the position of Earth using pulsars, an address valid for millions of years.', 'Its last signal arrived in 2003, so faint it could barely be told from the noise.'],
  fict: 'The Pioneer plaque is probably the most reproduced image of space exploration after the photo of the Earth.'
},
iss: {
  kind: 'Humanity\'s home in orbit',
  quick: [['LAUNCH','11/20/1998'],['ALTITUDE','~420 km'],['SPEED','28,000 km/h'],['ONE LAP','92 min'],['SIZE','109 m, a football field'],['INHABITED SINCE','11/2/2000']],
  sections: [
    {t:'THE HOME', rows:[['Construction','More than 40 launches over 13 years, assembled piece by piece in orbit'],['Who built it','15 countries, with the United States and Russia sharing the backbone'],['The routine','16 laps around the Earth per day: a sunrise every 45 minutes'],['Position here','Symbolic: at real scale it would almost touch the surface']]},
    {t:'RECORD', rows:[['Continuous habitation','Since November 2, 2000 there has always been someone living there'],['Visible to the naked eye','Yes: it looks like a fast star crossing the sky at dusk'],['Science','Thousands of microgravity experiments, from crystals to artificial hearts'],['Future','Retirement planned for around 2030, with a guided reentry over the Pacific']]}
  ],
  facts: ['It is the most expensive structure ever built: more than 150 billion dollars.', 'Since November 2000 humanity has never again been entirely on the planet: there is always someone up there.', 'It goes all the way around the Earth in 92 minutes, at 28,000 km/h.'],
  fict: 'The setting of Gravity and countless films, and its NASA live stream is one of the most watched broadcasts on the internet.'
},
hubble: {
  kind: 'The eye that redefined the cosmos',
  quick: [['LAUNCH','4/24/1990'],['ALTITUDE','~520 km'],['MIRROR','2.4 m'],['ONE LAP','95 min'],['REPAIRS IN ORBIT','5 missions'],['STATUS','active']],
  sections: [
    {t:'THE DRAMA', rows:[['1990','It reaches space and the mirror turns out to have a manufacturing flaw'],['1993','Astronauts install the correction in orbit: the telescope got glasses'],['Afterwards','Five shuttle missions kept it new for decades'],['Position here','Symbolic: it flies a few kilometers above the ISS']]},
    {t:'RECORD', rows:[['Deep Field','It stared for 10 days at an "empty" patch of sky and found 3,000 galaxies'],['Output','More than 1.5 million observations and tens of thousands of papers'],['Pillars of Creation','The most famous photo in astronomy is his, from 1995'],['Today','Still active, working in tandem with James Webb']]}
  ],
  facts: ['It was born nearsighted by a polishing error of 2 thousandths of a millimeter, and was fixed in space.', 'The Deep Field showed that even the "nothing" of the sky holds thousands of galaxies.', 'Its photos defined the look of the cosmos for a whole generation.'],
  fict: 'The Pillars of Creation and the Deep Field became bedroom posters, album covers and wallpapers around the world.'
},
sputnik: {
  kind: 'The first human-made object in orbit',
  quick: [['LAUNCH','10/4/1957'],['SIZE','58 cm'],['MASS','83.6 kg'],['ONE LAP','96 min'],['SIGNAL','21 days of beeps'],['REENTRY','1/4/1958']],
  sections: [
    {t:'THE DAY THAT CHANGED EVERYTHING', rows:[['10/4/1957','The Soviet Union puts a polished aluminum sphere with four antennas into orbit'],['The beep','It transmitted on a frequency any ham radio could pick up: the whole world HEARD it'],['The shock','In the United States, the scare led to the creation of NASA the following year'],['Position here','Symbolic and posthumous: the original reentered and burned up in January 1958']]},
    {t:'RECORD', rows:[['The race','It was the starting gun of the space race that would reach the Moon in 12 years'],['Its life','21 days of signal, 1,400 orbits, 3 months in space'],['The name','Sputnik means "fellow traveler" in Russian']]}
  ],
  facts: ['It was just a 58 cm sphere with a radio, and it changed the history of the 20th century in 21 days of beeps.', 'Any ham radio operator on the planet could tune in to its signal: perfect propaganda.', 'Three months after launch it reentered and became a meteor over the Atlantic.'],
  fict: '"Sputnik moment" became an expression for any technological scare, and its beep opens countless Cold War films.'
},
jwst: {
  kind: 'The golden mirror at the L2 point',
  quick: [['LAUNCH','12/25/2021'],['WHERE','L2 point, 1.5 million km'],['MIRROR','6.5 m, 18 hexagons'],['SUNSHIELD','a tennis court'],['SEES','infrared'],['1ST IMAGE','7/12/2022']],
  sections: [
    {t:'THE MACHINE', rows:[['The mirror','6.5 meters across in 18 GOLD-coated hexagons, folded to fit in the rocket'],['The sunshield','Five layers the size of a tennis court, keeping the cold side at −230 °C'],['No repairs','At 1.5 million km, too far for any servicing mission: it had to work the first time'],['Position here','Symbolic: it does NOT orbit the Earth, it sits at the L2 point, four times farther than the Moon']]},
    {t:'RECORD', rows:[['The deployment','344 single points of failure in the first weeks, all of them worked'],['7/12/2022','The first batch of images, with the Cosmic Cliffs of Carina'],['What it sees','In infrared: the first galaxies of the universe and the atmospheres of exoplanets'],['Duo','It works together with Hubble, each in its own band of light']]}
  ],
  facts: ['The mirror is coated in real gold: 48 grams, less than a golf ball.', 'It is sensitive enough to detect the heat of a bumblebee at the distance of the Moon.', 'It was launched folded like origami and unfolded itself on the way to L2.'],
  fict: 'Its first image was revealed live by the President of the United States, a planet-wide TV event.'
},
sedna: {
  kind: 'The loneliest world known',
  quick: [['DIAMETER','~1,000 km'],['YEAR','~11,400 years'],['DISTANCE','76 to 900 AU'],['COLOR','the reddest in the system'],['DISCOVERED','2003'],['PERIHELION','~2076']],
  sections: [
    {t:'THE IMPOSSIBLE ORBIT', rows:[['Eccentricity','From 76 to 900 AU: one lap takes 11,400 years, longer than all of written civilization'],['The mystery','Nothing known explains how it got there: not the planets, not the Kuiper belt'],['The hypotheses','A star that passed close in the Sun\'s cradle, or Planet Nine, still unseen'],['Position here','Approaching the perihelion of ~2076: its only visit in our era. Distances follow the compressed scale of the scene']]},
    {t:'INNER OORT CLOUD, OR WHAT?', rows:[['The new crowd','Sedna started a class of its own: the SEDNOIDS, today with 2012 VP113 and Leleakuhonua'],['The modern reading','Many astronomers call it an INNER OORT CLOUD object: its perihelion does not even touch the Kuiper belt'],['What it is, then','Officially a dwarf planet candidate; in practice, the ambassador of the outer reaches'],['Why it matters','Each new sednoid tightens the net: either a star stirred the Sun\'s cradle, or there is a planet hiding out there']]},
    {t:'RECORD', rows:[['Discovered','2003 · Mike Brown, him again'],['Name','The Inuit goddess of the frozen sea, who lives at the bottom of the Arctic'],['Color','Reddish like almost nothing in the system, maybe tholins billions of years old'],['Temperature','Never above −240 °C']]}
  ],
  facts: ['The last time Sedna came near the Sun, humanity had not yet invented writing.', 'Its orbit is so stretched that no known explanation accounts for it: something threw it there.', 'It is one of the reddest objects ever observed, and nobody knows exactly why.', 'It is the first of the sednoid family, the likely residents of the inner edge of the Oort Cloud.'],
  fict: 'Sedna is the muse of the Planet Nine theories: every simulation of the ninth planet starts by trying to explain its orbit.'
},
eris: {
  kind: 'The one that dethroned Pluto',
  quick: [['DIAMETER','2,326 km'],['YEAR','558 years'],['DISTANCE','38 to 98 AU'],['TEMP','−243 °C'],['MOON','Dysnomia'],['DISCOVERED','2005']],
  sections: [
    {t:'THE WILD ORBIT', rows:[['Eccentricity','From 38 to 98 AU: at perihelion it gets closer than Pluto at aphelion'],['Tilt','44 degrees out of the plane of the planets, the largest among the big dwarfs'],['Today','Near aphelion: the Sun seen from there is just a very bright star'],['Position here','The ellipse is real in shape; distances follow the compressed scale of the scene']]},
    {t:'RECORD', rows:[['Discovered','2005 · Mike Brown, nicknamed "Xena"'],['The chaos','It is 27% more massive than Pluto, and forced the definition of "planet" in 2006'],['Name','The Greek goddess of discord. Perfect.'],['Surface','Almost pure methane ice, one of the most reflective objects in the system']]}
  ],
  facts: ['Mike Brown, the discoverer, proudly uses the title "the man who killed Pluto".', 'At aphelion, the Sun seen from there is just a very bright star.', 'Its orbit is so tilted and stretched that it took decades for anyone to notice the point of light.'],
  fict: 'The name of the goddess of discord was chosen for the astronomical fight it caused: the trivia is the story itself.'
},
p67: {
  kind: 'Rosetta\'s rubber duck',
  quick: [['NUCLEUS','4.3 × 4.1 km, two lobes'],['PERIOD','6.45 years'],['DISTANCE','1.24 to 5.68 AU'],['VISIT','Rosetta, 2014-2016'],['LANDING','Philae, 11/12/2014'],['NEXT PERIHELION','2028']],
  sections: [
    {t:'THE ROSETTA MISSION', rows:[['10 years of travel','The European probe chased the comet for a decade before catching it in 2014'],['The landing','The Philae lander bounced TWICE and stopped on its side in a crevice, but it worked'],['Two years together','Rosetta orbited the comet through the whole perihelion, watching the jets wake up'],['The end','In 2016 it descended for good and stayed: it is resting on the comet to this day']]},
    {t:'THE RUBBER DUCK', rows:[['The shape','Two lobes stuck together: either two comets that met, or one that was carved'],['The song','The magnetometer picked up oscillations that became the famous "song" of 67P'],['Different water','Its water does not match the oceans: our water may not come from comets like this']]}
  ],
  facts: ['Philae bounced twice on landing and still sent back science from inside a crevice.', 'Rosetta is resting on it to this day, going around the Sun every 6.45 years.', 'The comet\'s "song", magnetic oscillations turned into sound, became a YouTube hit.'],
  fict: 'The rubber-duck shape and the mysterious song made 67P the internet\'s favorite comet.'
},
halebopp: {
  kind: 'The Great Comet of 1997',
  quick: [['NUCLEUS','~60 km, a giant'],['PERIOD','~2,530 years'],['PERIHELION','APR 1, 1997'],['DISCOVERED','JUL 23, 1995'],['NAKED EYE','18 months, a record'],['APHELION','~370 AU']],
  sections: [
    {t:'THE GREAT COMET', rows:[['The show','It stayed visible to the naked eye for 18 MONTHS, the record of all recorded history'],['The two tails','The white dust tail and the blue ion tail, split across the sky: the classic 1997 photo'],['The nucleus','About 60 km, four times Halley\'s: one of the largest ever measured'],['The discovery','Alan Hale and Thomas Bopp, on the SAME night in 1995, neither knowing about the other']]},
    {t:'THE JOURNEY', rows:[['Where it comes from','From the edge of the Oort Cloud: its aphelion lies at ~370 AU'],['The upright orbit','Tilted almost 90 degrees: it pierces the plane of the planets from top to bottom'],['Where it is now','Already past the orbit of Neptune, heading for the deep ice'],['The return','It only comes back around the year 4500']]}
  ],
  facts: ['It stayed visible to the naked eye for eighteen months, the record of any comet in recorded history.', 'Its orbit is almost perpendicular to the plane of the planets: it pierces the Solar System from top to bottom.'],
  fict: 'The Great Comet of 1997 hung over a generation: it got into family photos, record covers and the memory of everyone who looked up that year.'
},
halley: {
  kind: 'The comet of every generation',
  quick: [['NUCLEUS','15 × 8 km'],['PERIOD','75 to 76 years'],['LAST VISIT','1986'],['NEXT','2061'],['SPEED','up to 254,000 km/h'],['RECORDS','since 240 BC']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Period','75 to 76 years, a VERY eccentric real orbit (symbolic here)'],['Reach','From inside the orbit of Venus to beyond Neptune'],['Direction','Retrograde, against the flow of the planets']]},
    {t:'RECORD', rows:[['Edmond Halley','Predicted in 1705 the return of 1758; he did not live to see it, but got the name'],['1066','Embroidered on the Bayeux Tapestry as an omen'],['1986','The Giotto probe photographed the nucleus up close'],['Heritage','The Orionid and Eta Aquariid meteor showers are its dust']]}
  ],
  facts: ['Mark Twain was born and died with Halley in the sky (1835 and 1910), as he himself predicted.', 'In 1910 people sold "anti-comet pills" against the gas of the tail. They worked: nobody died.'],
  fict: 'Practically every almanac, novel and cartoon of the 20th century has Halley, from Tintin to The Simpsons.'
},
tsuchinshan: {
  kind: 'The great comet of 2024',
  quick: [['NUCLEUS','a few km'],['PERIHELION','SEP 27, 2024 · 0.39 AU'],['CLOSEST TO EARTH','OCT 12, 2024 · 70 million km'],['DISCOVERED','JAN 9, 2023'],['BRIGHTNESS','up to magnitude −4'],['TILT','139° · retrograde']],
  sections: [
    {t:'THE GREAT COMET OF 2024', rows:[['The show','Visible to the naked eye for weeks: first at dawn in late September, then at dusk in October, with a tail over 20 degrees long'],['The peak','Around October 9 and 10 it reached close to magnitude −4, shining like Venus, helped by sunlight scattering forward through the dust of the tail'],['The anti-tail','In mid-October a spike appeared pointing TOWARD the Sun: dust in the orbital plane seen edge-on, the signature of the great comets'],['From the south','The best southern-hemisphere window was late September, at sunrise; in October it moved into everyone\'s evening sky']]},
    {t:'THE JOURNEY', rows:[['Where it comes from','From the Oort Cloud, on a lap of about 80,000 years'],['The upright, backwards orbit','Tilted 139 degrees: it crosses the plane of the planets from top to bottom and in the opposite direction'],['The perihelion','September 27, 2024, at 0.39 AU, inside the orbit of Mercury'],['The exit','The pass by the Sun left the trajectory slightly hyperbolic: most likely it will never come back'],['Where it is now','On its way to the orbit of Saturn, faded, heading for the deep ice']]},
    {t:'RECORD', rows:[['JAN 9, 2023','Discovered at the Purple Mountain Observatory (Tsuchinshan), in China, and independently by the ATLAS survey, in South Africa, in February: hence the double name'],['The scare','In July 2024 a study predicted it would disintegrate before perihelion; it survived whole'],['The legacy','Probably the most photographed comet in history: millions of phone photos at dusk in October 2024']]}
  ],
  facts: ['It was the brightest comet in decades for the northern hemisphere, and the most photographed by phone in history.', 'The orbit is retrograde and almost upright, and the pass by the Sun left it hyperbolic: it will probably never return.', 'A study predicted it would break apart before reaching the Sun. It passed whole and put on the show.'],
  fict: null
},
atlas3i: {
  kind: 'The third messenger from another star',
  quick: [['NUCLEUS','less than 5.6 km'],['SPEED','58 km/s, from outside'],['ECCENTRICITY','6.1 · record'],['PERIHELION','OCT 29, 2025 · 1.36 AU'],['DISCOVERED','JUL 1, 2025 · ATLAS'],['CAME FROM','Sagittarius, the galactic center']],
  sections: [
    {t:'THE THIRD VISITOR', rows:[['The lineage','After ʻOumuamua (2017) and comet Borisov (2019), the third confirmed object from another star'],['The proof','Eccentricity of 6.1, the most open hyperbola ever measured: ʻOumuamua\'s was 1.2. Nothing bound to the Sun moves like that'],['The speed','It arrived at 58 km/s relative to the Sun, the fastest of the three visitors'],['Where it came from','From the direction of Sagittarius, the galactic center, skimming the plane of the planets in the opposite direction (175 degrees)']]},
    {t:'A REAL COMET', rows:[['The coma','Unlike ʻOumuamua, it showed a coma and tail from discovery: ice boiling off like a homegrown comet'],['James Webb','Measured a coma dominated by carbon dioxide, with far more CO₂ than water: a chemistry unlike our own comets'],['The nickel','Telescopes in Hawaii saw nickel vapor without iron, a strange pattern that Borisov also showed'],['The nucleus','Hubble limited its size to less than 5.6 km; probably much smaller than that']]},
    {t:'THE AGE', rows:[['The hypothesis','The trajectory suggests an origin in the THICK disk of the galaxy, a population of old stars'],['The number','It may be some 7 billion years old: older than the Solar System itself'],['What that is worth','It would be the oldest piece of another planetary system we have ever seen up close']]},
    {t:'RECORD', rows:[['JUL 1, 2025','Discovered by the ATLAS telescope in Río Hurtado, Chile; earlier photos from June were later found in the archives'],['OCT 3, 2025','It passed 0.19 AU from Mars, and the probes in Martian orbit took the closest photos'],['OCT 29, 2025','Perihelion at 1.36 AU, on the far side of the Sun from Earth'],['DEC 19, 2025','Closest approach to Earth, at 1.8 AU: no risk at all'],['The exit','Already heading for the ice, near the orbit of Saturn, never to return']]}
  ],
  facts: ['It is the third confirmed interstellar object, and the fastest and most hyperbolic of the three: eccentricity 6.1.', 'It may be older than the Solar System: the trajectory points to the thick disk of the galaxy, of stars 7 billion years old.', 'The probes in orbit around Mars took the closest photos of it, in October 2025.'],
  fict: 'As with ʻOumuamua, Avi Loeb raised the alien-ship hypothesis; the answer came in spectra: CO₂ ice, dust and nickel, a comet from another star.'
},
oumuamua: {
  kind: 'The first messenger from another star',
  quick: [['SIZE','~100 to 400 m'],['SHAPE','cigar or pancake, 10:1'],['ORIGIN','another star system'],['SPEED','87 km/s'],['DETECTION','2017 · Pan-STARRS'],['STATUS','already gone']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Trajectory','Hyperbolic: it came in, curved around the Sun and left forever (position here symbolic)'],['Rotation','Tumbling, every ~7.3 h'],['Came from','Roughly the direction of Vega, in Lyra']]},
    {t:'RECORD', rows:[['Name','"Scout" or "messenger from afar" in Hawaiian'],['The mystery','It accelerated on the way out with no visible comet tail'],['Hypotheses','A hydrogen iceberg? A pancake-shaped fragment? An alien light sail (Avi Loeb)?'],['Legacy','It opened the category "interstellar object"; Borisov came in 2019']]}
  ],
  facts: ['A cigar shape with a ~10:1 ratio, nothing like it in our system.', 'Project Lyra studies a probe to reach it. There is still time.'],
  fict: 'Rendezvous with Rama, by Arthur C. Clarke (1973), foresaw the scene: an interstellar cylinder crossing the system. Loeb wrote Extraterrestrial defending the artificial hypothesis.'
},
cinturao: {
  kind: 'A ring of rubble between Mars and Jupiter',
  quick: [['EXTENT','2.1 to 3.3 AU'],['BODIES','>1 million'],['TOTAL MASS','4% of the Moon'],['LARGEST','Ceres'],['MEAN DISTANCE','~1 million km between rocks'],['ORIGIN','a planet that never formed']],
  sections: [
    {t:'RECORD', rows:[['What it is','Leftovers of planet formation that Jupiter never let become a planet'],['Real density','Probes cross it without even aiming; the movies exaggerate'],['Composition','Rock, metal and ice · Ceres even has water'],['Visitors','Dawn (Ceres/Vesta) · NEAR (Eros) · Lucy en route']]}
  ],
  facts: ['Adding it all up, the whole belt amounts to only 4% of the mass of the Moon.', 'The movies lie: the rocks are so far apart that a probe crosses the belt without dodging anything.'],
  fict: 'The Expanse: this is where the Belter culture is born. "Beltalowda!"',
  moonsMeta: 'MAIN BODIES'
},
ceres: {
  kind: 'Dwarf planet',
  quick: [['DIAMETER','940 km'],['GRAVITY','0.029 g'],['DAY','9 h'],['YEAR','4.6 years'],['WATER','~25% of the mass'],['DAWN','2015 to 2018']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Region','Main belt, between Mars and Jupiter'],['Distance from the Sun','414 million km (2.8 AU)'],['Year','4.6 years'],['Day','9 hours']]},
    {t:'STRUCTURE', rows:[['Diameter','940 km, a third of the mass of the whole belt'],['Water','Up to 25% of the mass, more fresh water than all of Earth'],['Occator','The crater of the bright spots, 92 km across'],['Ahuna Mons','A 4 km cryovolcano that erupted salty mud, not lava'],['Underneath','A reservoir of brine still liquid, fed by salt and pressure']]},
    {t:'RECORD', rows:[['January 1, 1801','Giuseppe Piazzi finds the first asteroid in history'],['The confusion','It was called a planet for 50 years, became an asteroid, and in 2006 a dwarf planet'],['Dawn (2015 to 2018)','The first spacecraft to orbit a dwarf planet, and the first to orbit two different worlds'],['The bright spots','Sodium carbonate: salt that rose from underground and dried on the surface, still today'],['Organics','Dawn found carbon compounds near Ernutet, raw material of life'],['The probe today','It ran out of fuel in 2018 and remains in orbit, silent, so as not to contaminate the surface']]}
  ],
  facts: ['In its first years it was classified as the 8th planet.', 'The "headlights" of the Occator crater puzzled the world until Dawn revealed them: salt deposits from an ancient ocean.'],
  fict: 'The Expanse: Ceres station is the heart of the Belt, home of detective Miller. "Beltalowda!"'
},
vesta: {
  kind: 'The planet that stopped halfway',
  quick: [['DIAMETER','525 km'],['GRAVITY','0.026 g'],['DAY','5.3 h'],['YEAR','3.6 years'],['DAWN','2011 to 2012'],['NAKED EYE','yes, almost']],
  sections: [
    {t:'STRUCTURE', rows:[['What it is','Not quite an asteroid: it has an iron core, a mantle and a crust, like an unfinished planet'],['Rheasilvia','A 500 km crater at the south pole, almost the size of the body itself'],['The central peak','22 km tall, rivaling Olympus Mons on Mars for the title of tallest in the system'],['The blow','The impact tore off 1% of Vesta\'s volume and changed its rotation']]},
    {t:'RECORD', rows:[['1807','Discovered by Heinrich Olbers, the fourth asteroid found'],['Dawn (2011 to 2012)','It spent 14 months in orbit mapping everything before moving on to Ceres'],['The meteorites','About 6% of all the meteorites that fall on Earth came from here'],['How we know','Dawn compared the mineral signature and it matched the rocks in our museums'],['What it taught','It is a time capsule of the first few million years of the Solar System']]}
  ],
  facts: ['It is the brightest asteroid in the sky: in ideal conditions you can see it with the naked eye.', 'You have probably already seen a piece of Vesta: they are in meteorite collections around the world.', 'The Rheasilvia impact scattered a whole family of fragments that still orbit nearby.'],
  fict: null
},
palas: {
  kind: 'Giant asteroid',
  quick: [['DIAMETER','512 km'],['ORBIT','tilted 34°'],['YEAR','4.6 years'],['DISCOVERED','1802']],
  sections: [
    {t:'RECORD', rows:[['Discovered','1802 · Heinrich Olbers'],['Orbit','Tilted 34°, it crosses the belt "from above"'],['Surface','It looks like a golf ball, it is so cratered']]}
  ],
  facts: ['Its crooked orbit makes any mission to it extremely expensive in fuel.'],
  fict: null
},
eros: {
  kind: 'Near-Earth asteroid',
  quick: [['SIZE','34 × 11 km'],['DAY','5.3 h'],['CLASS','NEA'],['DISCOVERED','1898']],
  sections: [
    {t:'RECORD', rows:[['Discovered','1898 · Carl Gustav Witt'],['Class','NEA, its real orbit crosses the neighborhood of Earth (marked here for convenience)'],['Milestone','1st asteroid to receive a LANDING: NEAR Shoemaker, 2001'],['Shape','A 34 km "peanut"']]}
  ],
  facts: ['NEAR Shoemaker was not designed to land, and it landed anyway, still working.'],
  fict: 'The Expanse: Eros is where it all begins. No spoilers, kopeng.'
},
kuiper: {
  kind: 'The third realm of the Solar System',
  quick: [['EXTENT','30 to 55 AU'],['OBJECTS','>100,000 (>100 km)'],['KING','Pluto'],['MASS','~2% of Earth'],['VISITED','New Horizons'],['AGE','original material, 4.6 billion years']],
  sections: [
    {t:'RECORD', rows:[['What it is','A ring of frozen worlds beyond Neptune, intact leftovers of the system\'s formation'],['Predicted','By Gerard Kuiper (1951), confirmed only in 1992'],['Notable residents','Pluto, Eris, Makemake, Haumea, Arrokoth'],['Comets','It is the cradle of short-period comets, like Halley'],['Beyond it','The Oort Cloud, up to 1 light-year away']]}
  ],
  facts: ['It was the discovery of Eris, here, that demoted Pluto to dwarf planet in 2006.', 'It is untouched material from the formation of the Solar System, frozen in place for 4.6 billion years.'],
  fict: 'The Expanse: beyond the Belt, the territory where Earth and Mars do not rule. In the Star Trek universe, the region becomes a smuggling route.',
  moonsMeta: 'DWARF WORLDS & RELICS'
},
makemake: {
  kind: 'The Easter world',
  quick: [['DIAMETER','1,430 km'],['YEAR','306 years'],['DAY','22.8 h'],['TEMP','−239 °C'],['MOON','MK2'],['DISCOVERED','2005']],
  sections: [
    {t:'RECORD', rows:[['Name','Creator god of the Rapa Nui people; it was discovered days after Easter 2005'],['Color','Reddened by tholins, organic molecules cooked by radiation'],['Atmosphere','None detectable, the surprise of 2011'],['Moon','MK2, as dark as coal, found in 2016']]}
  ],
  facts: ['It is the second brightest object in the Kuiper belt after Pluto.'],
  fict: null
},
haumea: {
  kind: 'The spinning egg with a ring',
  quick: [['DIMENSIONS','2,100 × 1,680 × 1,100 km'],['DAY','3.9 h (!)'],['YEAR','284 years'],['MOONS','2'],['RING','yes'],['DISCOVERED','2004']],
  sections: [
    {t:'RECORD', rows:[['Shape','It spins so fast (3.9 h) that it became an ellipsoid, like an American football'],['Ring','Discovered in 2017, the first ring around a dwarf planet'],['Moons','Hiʻiaka and Namaka, Hawaiian goddesses, daughters of Haumea'],['Origin','An ancient collision scattered the family of fragments that orbits along with it']]}
  ],
  facts: ['A day lasts less than a work shift: 3.9 hours.', 'The sphere here is symbolic; the real thing is a flattened egg.'],
  fict: null
},
arrokoth: {
  kind: 'The primordial snowman',
  quick: [['SIZE','36 × 20 km'],['SHAPE','two lobes stuck together'],['YEAR','298 years'],['VISIT','New Horizons · 2019'],['NAME','"sky" in Powhatan'],['AGE','untouched for 4.6 billion years']],
  sections: [
    {t:'RECORD', rows:[['Record','The most distant object ever visited by a spacecraft (6.4 billion km)'],['Flyby','January 1, 2019, New Horizons, after Pluto'],['Shape','Two bodies that touched gently and stayed together forever'],['Why it matters','It is an intact sample of the material that formed the planets']]}
  ],
  facts: ['Before its official name, it was "Ultima Thule".', 'The collision that formed it was so gentle that you could walk faster than it.'],
  fict: null
},
oort: {
  kind: 'The shell of ice that wraps the system',
  quick: [['EXTENT','2,000 to 100,000 AU'],['REACH','almost 1 light-year'],['NUCLEI','trillions'],['ORIGIN','long-period comets'],['SEEN','never, only inferred'],['VOYAGER 1','arrives in ~300 years']],
  sections: [
    {t:'RECORD', rows:[['What it is','A spherical shell of trillions of icy nuclei, predicted by Jan Oort in 1950'],['Scale','The outer edge lies almost 1 light-year away, a quarter of the way to Alpha Centauri'],['Function','The pantry of long-period comets, like Hale-Bopp'],['Voyager 1','It enters the cloud in ~300 years... and takes 30,000 years to cross it'],['Proof','Nobody has ever seen it; we know of it from the orbits of the comets it sends us']]}
  ],
  facts: ['If the Solar System were a coin, the Oort Cloud would be a stadium around it.', 'Technically this is where the Sun "ends" and true interstellar space begins.'],
  fict: 'In The Three-Body Problem the Trisolaran probes cross the Oort Cloud, and every science fiction author uses it as the exit gate from home.'
},
/* ---- r240 e r241: Bennu, Ryugu e Swift-Tuttle ---- */
bennu: {
  kind: 'The rock that came to Earth in a capsule',
  quick: [['DIAMETER','490 m'],['DAY','4.3 h'],['YEAR','437 d'],['DISCOVERED','1999'],['SAMPLE','121.6 g · SEP 24, 2023'],['RISK','1 in 2,700 · year 2182']],
  sections: [
    {t:'OSIRIS-REX, THERE AND BACK', rows:[['2016','Launched on September 8, 2016; two years later it was circling the rock a few km away'],['The surprise','Bennu was spitting pebbles into space: an ACTIVE asteroid, nobody expected that'],['OCT 20, 2020','The touch: the arm sank half a meter into ground that looked solid and was loose sand; the lid jammed on rocks and the sample was leaking'],['SEP 24, 2023','The capsule parachuted into the Utah desert with 121.6 grams, the record asteroid sample'],['What comes next','The probe became OSIRIS-APEX and will meet Apophis on its close pass of 2029']]},
    {t:'WHAT CAME INSIDE', rows:[['Water','Clays that only form with water: Bennu was once part of a body with liquid water'],['Carbon','Almost 5 percent carbon, with organic molecules of every kind'],['The letters of life','Amino acids and all five bases of DNA and RNA, found in 2025'],['The salt','Phosphates and salts from an ancient salty ocean: the chemistry of a primordial soup, frozen']]},
    {t:'RECORD', rows:[['1999','Discovered by the LINEAR survey, in New Mexico'],['The name','Chosen in a contest by a 9-year-old boy: the sacred heron of Egypt, linked to rebirth'],['The shape','A 490-meter spinning top, a rubble pile so loose that the surface behaves like a ball pit'],['The risk','A 1 in 2,700 chance of hitting the Earth on September 24, 2182: the most closely watched asteroid in the sky']]}
  ],
  facts: ['OSIRIS-REx brought 121.6 grams of it to Earth in 2023: the largest asteroid sample ever collected.', 'The sample had amino acids and all five letters of DNA and RNA: the ingredients of life came ready-made from space.', 'The probe\'s arm sank half a meter on touchdown: the surface that looked like rock was loose sand held by almost no gravity.'],
  fict: 'The name came from a school contest in 2013: Michael Puzio, age 9, thought the probe\'s arm looked like the neck of a heron, the Egyptian sacred bird of rebirth.'
},
ryugu: {
  kind: 'The dragon palace that Hayabusa2 brought home in its pocket',
  quick: [['DIAMETER','900 m'],['DAY','7.6 h'],['YEAR','475 d'],['DISCOVERED','1999'],['SAMPLE','5.4 g · DEC 6, 2020'],['ALBEDO','0.04 · coal']],
  sections: [
    {t:'HAYABUSA2, THERE AND BACK', rows:[['2014','Launched on December 3, 2014 by JAXA, it arrived in June 2018'],['The robots','It dropped the MINERVA-II hoppers and the European MASCOT, which hopped across the surface for 17 hours'],['FEB 21, 2019','The first touch: a projectile fired into the ground and the raised dust collected, in seconds'],['APR 5, 2019','It fired a 2 kg copper bullet and opened a 15-meter artificial crater: to get material from below, never touched by the Sun'],['JUL 11, 2019','The second touch, inside the new crater: the subsurface of an asteroid, for the first time'],['DEC 6, 2020','The capsule landed at Woomera, Australia, with 5.4 grams; the probe went on to another asteroid, 1998 KY26, in 2031']]},
    {t:'WHAT CAME INSIDE', rows:[['The age','Material more primitive than any meteorite in the museums: the Earth never altered it'],['The chemistry','23 kinds of amino acids, uracil (a letter of RNA) and niacin, vitamin B3'],['The water','Hydrated minerals: the parent body had liquid water early in the Solar System'],['The color','One of the darkest objects known: it reflects only 4 percent of the light']]},
    {t:'RECORD', rows:[['1999','Discovered by the LINEAR survey'],['The name','Ryugu-jo, the palace of the Dragon King at the bottom of the sea, from the tale of Urashima Taro'],['The shape','A 900-meter spinning top, loose rubble spinning in 7.6 hours'],['The pair','Bennu and Ryugu are near twins: same top shape, same darkness, same chemistry of water and carbon']]}
  ],
  facts: ['Hayabusa2 opened an artificial crater with a copper bullet and collected subsurface material never touched by the Sun.', 'The 5.4 grams that came back held uracil, one of the letters of RNA, and vitamin B3.', 'It reflects only 4 percent of the light: darker than coal.'],
  fict: 'In the tale of Urashima Taro, the fisherman visits the dragon palace at the bottom of the sea and returns with a box he must not open: Hayabusa2 came back from Ryugu with the box, and opened it.'
},
swift: {
  kind: 'The father of the Perseids',
  quick: [['NUCLEUS','26 km'],['PERIOD','133 years'],['LAST VISIT','DEC 1992'],['NEXT','2126'],['THE SHOWER','Perseids, August 12'],['RECORDS','since 69 BC']],
  sections: [
    {t:'THE PERSEIDS', rows:[['The shower','Every lap it leaves dust along its path; the Earth crosses that trail in August and the sky rains stars: the Perseids'],['The peak','Around August 12, up to 100 meteors an hour under a dark sky, the most famous shower of the year'],['The trail','The grains burning tonight left the comet centuries ago, on earlier laps'],['The speed','Each grain comes in at 59 km/s: that is why the Perseids are fast and leave trails']]},
    {t:'THE WATCHED GIANT', rows:[['The nucleus','26 km: the largest known object that repeatedly approaches the Earth, twice the one that killed the dinosaurs'],['The scare','In 1973 a calculation suggested it could HIT the Earth in 2126; the 1992 return redid the orbit and the risk dropped to zero'],['2126','It passes 23 million km away, 60 times the distance of the Moon: a spectacle, not a threat'],['The long run','In 4479 it comes within 4 million km: its orbit and ours truly cross']]},
    {t:'RECORD', rows:[['1862','Discovered by Lewis Swift and Horace Tuttle, three days apart, in the United States'],['1866','Schiaparelli realizes its orbit is that of the Perseids: the first comet linked to a meteor shower'],['Ancient history','Chinese records from 69 BC and 188 AD match its returns'],['1992','Recovered by Tsuruhiko Kiuchi, a Japanese amateur astronomer, on the return that confirmed the 133-year period']]}
  ],
  facts: ['It is the father of the Perseids: the dust it leaves behind becomes the August meteor shower.', 'The nucleus is 26 km, twice the asteroid that killed the dinosaurs, and its orbit crosses ours: the largest watched object in the sky.', 'It was the first comet linked to a meteor shower, by Schiaparelli in 1866.'],
  fict: 'In Catholic tradition the Perseids are the Tears of Saint Lawrence, martyred on August 10, 258: the shower arrives every year on the saint\'s day.'
},
/* ---- fase 3, parte 1 (r242): TRAPPIST-1, Alpha Centauri, Sirius, Kepler-452, as estrelas famosas, Sgr A*, M16 e Orion ---- */
trappist1: {
  kind: 'Ultracool red dwarf',
  quick: [['TYPE','M8V'],['SURF. TEMP.','2,290 °C'],['MASS','0.09 Sun'],['RADIUS','~Jupiter'],['PLANETS','7'],['DISTANCE','40.7 ly']],
  sections: [
    {t:'STRUCTURE', rows:[['Type','Ultracool red dwarf (M8V)'],['Radius','Slightly larger than Jupiter'],['Mass','9% of the mass of the Sun'],['Temperature','2,290 °C'],['Lifetime','Trillions of years, it will outlive the Sun']]},
    {t:'RECORD', rows:[['Distance','40.7 light-years'],['Constellation','Aquarius'],['Planets','7, all rocky, discovered in 2016 and 2017'],['James Webb','Has already taken the temperature of b and c: they look like worlds without atmosphere'],['Next in line','e, f and g: the habitable zone is still on trial']]}
  ],
  facts: ['All 7 planets would fit INSIDE the orbit of Mercury.', 'Seen from one of them, the neighbors would look larger in the sky than our Moon.'],
  fict: null
},
t1b: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','1.12 R⊕'],['GRAVITY','~1.1 g'],['YEAR','1.5 d'],['EQ. TEMP.','~120 °C'],['MOONS','0'],['WATER','unlikely']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.012 AU'],['Year','1.51 days'],['Zone','Too hot'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['A year here lasts 36 hours. New Year\'s Eve every week... more than once.', 'JWST (2023): dayside at ~230 °C. Bare rock, no detectable atmosphere; a thin veil of CO₂ is still debated.']
},
t1c: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','1.10 R⊕'],['GRAVITY','~1.1 g'],['YEAR','2.4 d'],['EQ. TEMP.','~70 °C'],['MOONS','0'],['WATER','unlikely']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.016 AU'],['Year','2.42 days'],['Zone','Hot'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['JWST (2023) measured the dayside: ~110 °C. A dense Venus was ruled out; if there is an atmosphere, it is thin.']
},
t1d: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','0.79 R⊕'],['GRAVITY','~0.6 g'],['YEAR','4.0 d'],['EQ. TEMP.','~15 °C'],['MOONS','0'],['WATER','possible']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.022 AU'],['Year','4.05 days'],['Zone','Hot edge of the habitable zone'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['An equilibrium temperature similar to Earth\'s, but everything depends on the atmosphere.']
},
t1e: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','0.92 R⊕'],['GRAVITY','~0.8 g'],['YEAR','6.1 d'],['EQ. TEMP.','~−22 °C'],['MOONS','0'],['WATER','likely ★']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.029 AU'],['Year','6.10 days'],['Zone','HABITABLE ZONE, the favorite'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['The best candidate in the system: a density similar to Earth\'s, a possible ocean.', 'If it has an atmosphere, the side of "eternal dusk" would have a perpetually mild climate.', 'Next in James Webb\'s line: after the dry verdict on b and c, it is the one carrying the hope.']
},
t1f: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','1.04 R⊕'],['GRAVITY','~1.0 g'],['YEAR','9.2 d'],['EQ. TEMP.','~−54 °C'],['MOONS','0'],['WATER','possible (ice)']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.038 AU'],['Year','9.21 days'],['Zone','Habitable zone (cold)'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['A low density suggests A LOT of water, maybe a frozen ocean world.']
},
t1g: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','1.13 R⊕'],['GRAVITY','~1.0 g'],['YEAR','12.4 d'],['EQ. TEMP.','~−74 °C'],['MOONS','0'],['WATER','possible (ice)']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.047 AU'],['Year','12.35 days'],['Zone','Cold edge of the habitable zone'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['The largest of the seven. A plausible "Hoth": ice outside, maybe an ocean underneath.']
},
t1h: {
  kind: 'Rocky · tidally locked',
  quick: [['RADIUS','0.76 R⊕'],['GRAVITY','~0.6 g'],['YEAR','18.8 d'],['EQ. TEMP.','~−103 °C'],['MOONS','0'],['WATER','ice']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Distance from the star','0.062 AU'],['Year','18.77 days'],['Zone','Cold, beyond the habitable zone'],['Rotation type','Synchronous, one side in eternal day, the other in eternal night'],['Seasons','No (no relevant tilt)']]},
    {t:'RECORD', rows:[['Discovered','2016 to 2017 · TRAPPIST telescope + Spitzer'],['Method','Transit (shadow on the star)'],['Water','Possible on the ones in the habitable zone'],['Population','?']]}
  ],
  facts: ['The farthest one, and still 10 times closer to its star than Mercury is to the Sun.']
},
acena: {
  kind: 'Twin of the Sun',
  quick: [['TYPE','G2V'],['RADIUS','1.22 R☉'],['SURF. TEMP.','5,500 °C'],['MASS','1.1 Sun'],['AGE','~5.3 billion years'],['DISTANCE','4.37 ly']],
  sections: [
    {t:'STRUCTURE', rows:[['Type','G2V, the same class as the Sun'],['Mass','1.1 solar masses'],['Radius','1.22 R☉'],['Temperature','5,500 °C'],['Luminosity','1.5 × the Sun']]},
    {t:'RECORD', rows:[['Distance','4.37 light-years, the nearest system'],['Constellation','Centaurus'],['System','Triple: A + B + Proxima'],['Orbit A-B','79.9 years · 11 to 36 AU'],['Trivia','The brightest "star" in the sky of Mars']]}
  ],
  facts: ['From here, the Sun would be just a star in the constellation Cassiopeia.', 'With today\'s probe technology, the trip would take ~70,000 years.'],
  fict: 'Avatar: Pandora is a fictional moon of this system. Starfleet places one of its first shipyards here.'
},
acenb: {
  kind: 'Orange dwarf (K1V)',
  quick: [['TYPE','K1V'],['SURF. TEMP.','5,000 °C'],['MASS','0.9 Sun'],['RADIUS','0.86 R☉'],['ORBIT','79.9 years'],['SEPARATION','11 to 36 AU']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Orbit around A','79.9 years'],['Distance from A','11 to 36 AU (elliptical)'],['Seen from a planet of A','It would shine like hundreds of full moons']]},
    {t:'RECORD', rows:[['Type','K1V, an orange dwarf, a bit smaller than the Sun'],['Temperature','~5,000 °C'],['Planets','None confirmed to date'],['Note','A planet was once announced here (αCen Bb), later refuted']]}
  ],
  facts: ['A and B get as close as Sun-Saturn, and as far as Sun-Pluto.'],
  fict: null
},
proxima: {
  kind: 'Red dwarf (M5.5Ve) · flare star',
  quick: [['TYPE','M5.5Ve'],['SURF. TEMP.','2,700 °C'],['MASS','0.12 Sun'],['RADIUS','0.15 R☉'],['DISTANCE','4.24 ly'],['PLANETS','2 confirmed']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Orbit around the A and B pair','~550,000 years'],['Real distance from the pair','~13,000 AU (0.2 ly). Out of scale here.'],['Rotation','~83 days, slow for a red dwarf']]},
    {t:'THE TEMPER', rows:[['Flare star','It doubles in brightness within minutes, and goes back to normal as if nothing happened'],['The 2019 superflare','It became 14,000 times brighter in ultraviolet, for seven seconds'],['What that does','A burst like that strips the atmosphere of a nearby planet, layer by layer'],['The frequency','Not a rare event: it happens all the time, and has for billions of years'],['The verdict','It has probably sterilized its own planets long before we existed']]},
    {t:'RECORD', rows:[['Distance','4.24 light-years, the nearest star to the Sun, and it will stay so for millennia'],['Discovered','1915, by Robert Innes, of the Johannesburg Observatory'],['Lifetime','About 4 trillion years: it will shine long after all the others go out'],['The family','Proxima b (2016), d (2022) and c still a candidate']]}
  ],
  facts: ['It is the nearest star to the Sun and still invisible to the naked eye: you need a telescope to see our next-door neighbor.', 'In 2019 it let out a flash 14,000 times brighter than normal, and it has probably done that millions of times.', 'It will keep shining for 4 trillion years, long enough for the universe to become unrecognizable.', 'The light leaving it today reaches us four years and three months from now.'],
  fict: 'Project Breakthrough Starshot: light sails at 20% of the speed of light would get here in ~20 years.'
},
proximab: {
  kind: 'Rocky · habitable zone',
  quick: [['RADIUS','~1.03 R⊕'],['MASS','≥1.07 M⊕'],['YEAR','11.2 d'],['EQ. TEMP.','−39 °C'],['ZONE','habitable'],['WATER','possible']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Year','11.19 days'],['Distance from the star','0.0485 AU, or 5% of the distance between the Sun and the Earth'],['Rotation','Probably synchronous, with one side in eternal day'],['The terminator','The band of eternal dusk between the hot side and the frozen one is where life would stand a chance'],['Seasons','There are none']]},
    {t:'RECORD', rows:[['2016','Discovered by ESO in the Pale Red Dot campaign, which watched the star night after night'],['The light','It receives 65% of the energy the Earth gets, but almost all of it in red and infrared'],['The problem','The star\'s bursts have probably stripped any atmosphere it ever had'],['The hope','If it has a strong magnetic field, or if the atmosphere rebuilds itself, there is still a chance'],['The check','It does not transit in front of the star as seen from here, which makes studying its atmosphere very hard']]}
  ],
  facts: ['It is the nearest potentially habitable exoplanet there is, and probably always will be.', 'The sky there would be reddish orange, with the star looking three times larger than our Sun.', 'Since it does not pass in front of its star as seen from Earth, not even James Webb can properly analyze its atmosphere.', 'It is the target of Breakthrough Starshot: light sails that would arrive in twenty years, against the seventy thousand years of an ordinary probe.'],
  fict: 'It is the favorite interstellar address of fiction: it appears in Aurora, by Kim Stanley Robinson, and in practically every story of a first crewed trip to another star.'
},
proximad: {
  kind: 'Hot sub-Earth',
  quick: [['RADIUS','~0.81 R⊕'],['MASS','~0.26 M⊕'],['YEAR','5.1 d'],['EQ. TEMP.','~90 °C'],['ZONE','too hot'],['WATER','no']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Year','5.12 days'],['Distance from the star','0.029 AU'],['Rotation','Probably synchronous']]},
    {t:'RECORD', rows:[['Discovered','2022 · ESPRESSO spectrograph (VLT)'],['Mass','A quarter of Earth\'s, one of the smallest ever detected by radial velocity'],['Surface','Hot rock, with no relevant atmosphere']]}
  ],
  facts: ['Detecting it required measuring the star "wobbling" at just 40 cm/s, walking speed.'],
  fict: null
},
siriusa: {
  kind: 'The brightest star of the night sky',
  quick: [['TYPE','A1V'],['SURF. TEMP.','9,940 °C'],['MASS','2.06 Sun'],['RADIUS','1.71 R☉'],['DISTANCE','8.6 ly'],['LUMINOSITY','25 Suns']],
  sections: [
    {t:'STRUCTURE', rows:[['Type','A1V, white, hot and young'],['Mass','2.06 solar masses'],['Temperature','9,940 °C'],['Age','~240 million years'],['Luminosity','25 × the Sun']]},
    {t:'RECORD', rows:[['Distance','8.6 light-years'],['Constellation','Canis Major'],['Name','From the Greek seirios, "scorching"'],['Companion','Sirius B, the white dwarf (tap the orbit)'],['In ancient Egypt','Its heliacal rising announced the flooding of the Nile']]}
  ],
  facts: ['It shines twice as bright as the second brightest (Canopus).', 'It is approaching: in 60,000 years it will shine even brighter.'],
  fict: 'Harry Potter: Sirius Black, the animagus in dog form, honors the star of Canis Major.'
},
siriusb: {
  kind: 'A stellar corpse the size of the Earth',
  quick: [['TYPE','DA2 (white dwarf)'],['MASS','1.02 Sun'],['RADIUS','0.0084 R☉ (≈ Earth)'],['SURF. TEMP.','25,000 °C'],['ORBIT','50.1 years'],['DENSITY','~1 t/cm³']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Orbit around A','50.1 years'],['Separation','8 to 31 AU'],['Surface gravity','~350,000 times Earth\'s']]},
    {t:'RECORD', rows:[['Discovered','1862 · Alvan Clark, testing a new telescope'],['Origin','It was a 5 M☉ star, became a giant and collapsed ~120 million years ago'],['Density','A teaspoon would weigh ~5 tonnes'],['The Sun\'s future','Billions of years from now, the Sun becomes something like this']]}
  ],
  facts: ['The mass of the Sun squeezed into the size of the Earth.', 'It was predicted by mathematics (the "wobble" of Sirius A) 18 years before it was seen.'],
  fict: null
},
kepler452s: {
  kind: 'An older Sun',
  quick: [['TYPE','G2'],['RADIUS','1.11 R☉'],['SURF. TEMP.','5,500 °C'],['MASS','1.04 Sun'],['AGE','6 billion years'],['DISTANCE','~1,800 ly']],
  sections: [
    {t:'STRUCTURE', rows:[['Type','G2, like the Sun, 1.5 billion years older'],['Mass','1.04 solar masses'],['Luminosity','20% brighter than the Sun']]},
    {t:'RECORD', rows:[['Distance','~1,800 light-years'],['Constellation','Cygnus'],['System discovered','2015 · Kepler space telescope'],['Why it matters','It shows what our system may look like in the future']]}
  ],
  facts: ['The light we see from it left when the Earth was living through the Iron Age.'],
  fict: null
},
kepler452b: {
  kind: 'Super-Earth · "Earth 2.0"',
  quick: [['RADIUS','1.63 R⊕'],['YEAR','385 d'],['EQ. TEMP.','−8 °C'],['ZONE','habitable'],['INSOLATION','110% of Earth'],['WATER','possible']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Year','384.8 days, almost the same as ours'],['Distance from the star','1.05 AU'],['Zone','Habitable for 6 billion years']]},
    {t:'RECORD', rows:[['Discovered','2015 · NASA/Kepler, nicknamed "Earth 2.0"'],['Size','60% larger than Earth'],['Gravity','~2 × ours (if rocky)'],['The risk','With the star warming up, it may be entering a runaway greenhouse'],['Water','If it exists, oceans are possible']]}
  ],
  facts: ['A year there lasts 385 days: you would hardly need to change your calendar.', 'If the Earth has a "future", it may look like this one: 1.5 billion years older.'],
  fict: 'In the world press of 2015: "Earth\'s older cousin".'
},
betelgeuses: {
  kind: 'Red supergiant at the end of its life',
  quick: [['TYPE','M1-2 Ia'],['RADIUS','~760 R☉'],['MASS','16 to 19 Suns'],['SURF. TEMP.','3,300 °C'],['AGE','~8 to 10 million years'],['DISTANCE','~550 ly']],
  sections: [
    {t:'STRUCTURE', rows:[['Radius','~760 solar radii. In the Sun\'s place, its surface would reach past the orbit of Jupiter'],['Mass','16 to 19 solar masses, but spread over a gigantic volume'],['Density','The "gas" of the surface is thinner than the best vacuum made in a laboratory'],['Temperature','3,300 °C, cool for a star, and that is why it is red'],['Mass loss','It blows off the equivalent of one Earth per year, and wraps itself in its own dust']]},
    {t:'ROTATION & PULSE', rows:[['Rotation','It spins too fast for its size, and nobody has properly explained why'],['The heartbeat','It swells and shrinks in a ~400-day cycle, changing brightness to the naked eye'],['The long cycle','There is a second cycle of ~2,100 days, and it is the key to the recent mystery']]},
    {t:'THE GREAT DIMMING', rows:[['December 2019','The brightness dropped by half and the world thought it was about to explode'],['The investigation','Telescopes around the planet turned to the shoulder of Orion'],['The answer','It ejected a bubble of gas that cooled into dust, blocking part of its own light'],['The anticlimax','In 2020 the brightness went back to normal. It was not the end, it was a sneeze.']]},
    {t:'THE COMPANION', rows:[['The guess','In 2024 it was proposed that the long cycle was caused by a companion star'],['The nickname','Astronomers started calling the hypothesis Betelbuddy'],['2025','It was detected: a small star orbiting inside the atmosphere of the giant'],['Its fate','Betelgeuse will end up swallowing the companion']]},
    {t:'THE END', rows:[['When','Astronomically soon: within the next tens of thousands of years'],['What it will be like','It will shine like the full Moon, visible by day, and last months in the sky'],['Danger','None. At 550 light-years, it is too far to harm us'],['What remains','A neutron star and a new nebula in place of Orion\'s shoulder']]}
  ],
  facts: ['If it were in the Sun\'s place, the Earth would be inside it.', 'The surface is so thin that it is emptier than the best vacuum we can make here.', 'The Great Dimming of 2019 was not the omen of the explosion: it was a cloud of dust it blew out itself.', 'It may have already exploded. The light of the event would take some 550 years to get here.', 'When it explodes, it will be the brightest object in the night sky and you could read by its light.'],
  fict: 'Beetlejuice (1988): the film\'s title is a pun on the star. In The Hitchhiker\'s Guide, Ford Prefect comes "from the vicinity of Betelgeuse".'
},
polariss: {
  kind: 'The North Star (for now)',
  quick: [['TYPE','F7 Ib, supergiant'],['RADIUS','~37 R☉'],['MASS','~5 Suns'],['SURF. TEMP.','5,700 °C'],['DISTANCE','~433 ly'],['BRIGHTNESS','~1,260 Suns']],
  sections: [
    {t:'THE NORTH STAR', rows:[['Why it','The Earth\'s axis points almost exactly at it: the whole sky turns around Polaris'],['Navigation','Centuries of sailors found north (and their own latitude) just by looking at its height'],['How to find it','The two front stars of the Big Dipper point straight at it']]},
    {t:'FOR NOW', rows:[['Precession','The Earth\'s axis wobbles like a spinning top, one turn every 26,000 years'],['The past','For the Egyptians of the pyramids, the north star was THUBAN, in Draco'],['The future','In ~12,000 years the post passes to VEGA'],['Today','We live in the best era: Polaris has never been so well aligned']]},
    {t:'THE CEPHEID', rows:[['What it is','The nearest classical Cepheid: it PULSES, and its brightness rises and falls in 4 days'],['Why it matters','Cepheids are the rulers of the universe: the pulse reveals the true brightness, and the brightness reveals the distance'],['The family','It is triple: a dwarf close by (Ab) and a looser companion (B)']]}
  ],
  facts: ['The whole sky turns around it: in a long-exposure photo, Polaris is the still point at the center of the trails.'],
  fict: 'From Shakespeare to Interstellar, pointing at the North Star became synonymous with having a heading.'
},
aldebarans: {
  kind: 'The orange eye of the Bull',
  quick: [['TYPE','K5 III, giant'],['RADIUS','~44 R☉'],['MASS','~1.2 Sun'],['SURF. TEMP.','3,600 °C'],['DISTANCE','65 ly'],['BRIGHTNESS','~440 Suns']],
  sections: [
    {t:'THE GIANT', rows:[['What it is','A Sun-like star that has ALREADY aged: it exhausted the hydrogen in its core and swelled 44 times'],['The warning','It is a portrait of the Sun\'s future some 5 billion years from now'],['The color','Orange because the surface cooled as it swelled: 3,600 °C']]},
    {t:'THE EYE OF THE BULL', rows:[['In the sky','It is the brightest star of Taurus, the red eye of the drawing'],['The Hyades','It seems to belong to the V-shaped cluster, but that is an illusion: it lies HALFWAY there'],['Occultations','The Moon passes in front of it several times a year: you can watch the star blink out and back at the lunar edge']]},
    {t:'THE VISIT', rows:[['Pioneer 10','The first probe to leave the inner system is traveling TOWARD Aldebaran'],['The arrival','Some 2 million years from now, if nothing deflects it'],['The planet','A giant planet candidate (Aldebaran b) was proposed and remains under debate']]}
  ],
  facts: ['The Moon occults Aldebaran several times a year: it is the easiest bright star to watch vanish behind it.'],
  fict: 'Pioneer 10, with humanity\'s golden plaque aboard, reaches its neighborhood in ~2 million years.'
},
rigels: {
  kind: 'The blue supergiant at the foot of Orion',
  quick: [['TYPE','B8 Ia, supergiant'],['RADIUS','~75 R☉'],['MASS','~21 Suns'],['SURF. TEMP.','12,000 °C'],['DISTANCE','~860 ly'],['BRIGHTNESS','~120,000 Suns']],
  sections: [
    {t:'THE POWER', rows:[['Brightness','~120,000 times the Sun: even at 860 light-years it is the 7th brightest star in the sky'],['The color','Blue because the surface boils at 12,000 °C'],['The short life','A star like this burns its fuel in a few million years and dies as a supernova']]},
    {t:'THE FOOT OF ORION', rows:[['In the drawing','It is the hunter\'s left foot, opposite the red shoulder of Betelgeuse'],['The contrast','Orion carries both: the young, furious blue one below, the old, swollen red one above'],['The Witch','Rigel\'s light illuminates the Witch Head Nebula, which shines by reflecting it']]},
    {t:'THE FAMILY', rows:[['System','Rigel is not alone: at least FOUR stars dance together'],['Rigel B','A tight blue pair orbiting the giant at some 2,200 AU'],['The future','When it explodes, it will shine brighter than the full Moon in the sky of Earth']]}
  ],
  facts: ['Rigel is ~120,000 times more luminous than the Sun: if it were where Sirius is, it would cast shadows at night.'],
  fict: 'In Star Trek, the planets of Rigel appear from the very first pilot of the original series.'
},
antaress: {
  kind: 'The red heart of the Scorpion',
  quick: [['TYPE','M1.5 Iab, supergiant'],['RADIUS','~680 R☉'],['MASS','~12 Suns'],['SURF. TEMP.','3,200 °C'],['DISTANCE','~550 ly'],['BRIGHTNESS','~75,000 Suns']],
  sections: [
    {t:'THE RIVAL OF MARS', rows:[['The name','Anti-Ares, the rival of Mars: so red that the Greeks set it to compete with the planet'],['The duel','Mars passes near it in the sky every two years, and you can compare the two with the naked eye'],['The heart','It is the heart of the Scorpion, set in the middle of the drawing']]},
    {t:'THE MONSTER', rows:[['Radius','~680 solar radii: in the Sun\'s place it would swallow Mars and come close to Jupiter'],['The surface','So thin and turbulent that telescopes see giant cells of gas rising and sinking'],['The end','It will explode as a supernova within the next few hundred thousand years']]},
    {t:'THE COMPANION', rows:[['Antares B','A hot blue star orbiting the giant at ~550 AU'],['The impossible color','Next to the orange glare, it looks GREEN in the telescope: one of the rare "green" stars of the sky, by contrast'],['The eclipse','It only shows well when the Moon hides the giant for a few seconds']]}
  ],
  facts: ['Antares is so large that, in the Sun\'s place, its surface would reach past the asteroid belt.'],
  fict: 'The name means RIVAL OF MARS: the ancients thought the star and the planet competed over which was redder.'
},
sgra: {
  kind: 'The center of our galaxy',
  quick: [['MASS','4.3 million Suns'],['RADIUS','~17 R☉ (horizon)'],['DISTANCE','26,000 ly'],['DIAMETER','~24 million km'],['PHOTO','EHT · 2022'],['NOBEL','2020']],
  sections: [
    {t:'STRUCTURE', rows:[['Mass','4.3 million suns squeezed into a point'],['The horizon','About 24 million km across, it would fit inside the orbit of Mercury'],['The glow','Surprisingly faint: it is on a diet, swallowing very little matter'],['Comparison','The black hole of M87, the other one photographed, is a thousand times more massive']]},
    {t:'HOW WE KNOW', rows:[['The stars','Decades following stars that orbit an invisible point at the center of the galaxy'],['S2','One of them passes at 3% of the speed of light at its closest point, and completes a lap in 16 years'],['The math','From their orbits, the central mass can only be a black hole'],['Nobel 2020','Reinhard Genzel and Andrea Ghez took the prize for that discovery'],['The photo','In 2022 the Event Horizon Telescope showed the ring of light around the shadow']]},
    {t:'RECORD', rows:[['Where','In the direction of Sagittarius, 26,000 light-years away, behind clouds of dust'],['Why we cannot see it','The dust of the galactic disk blocks visible light: only radio and infrared get through'],['The 2019 flare','It swallowed something and shone 75 times brighter for a few hours'],['Scale note','Symbolic scene: the S stars orbit at distances of light-hours']]}
  ],
  facts: ['Everything on this map that lies in the Milky Way, including you, is orbiting this point.', 'The Sun takes 230 million years to go once around it.', 'The 2022 photo does not show the black hole: it shows its shadow against the hot gas behind.', 'It is so "clean" that if it were feeding with appetite, the night sky of Earth would look different.'],
  fict: 'It is the final destination of half of the science fiction involving black holes, from Interstellar to Cowboy Bebop.'
},
s2estrela: {
  kind: 'The star that proved the black hole',
  quick: [['TYPE','B, ~14 Suns'],['RADIUS','~6 R☉'],['YEAR','16 years'],['SPEED','3% of light'],['CLOSEST','120 AU'],['DISCOVERED','1990s']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Year','16 Earth years to complete a lap'],['At periastron','It comes within 120 AU of the black hole, racing at 3% of the speed of light'],['The curve','Its orbit is so elliptical that it serves as a relativity laboratory'],['Position here','Symbolic: the real orbit is much more elongated']]},
    {t:'RECORD', rows:[['The role','It was by following this star, lap after lap, that what lies at the center was proven'],['2018','Its pass confirmed the redshift predicted by Einstein'],['2020','The orbit showed the Schwarzschild precession, another prediction of relativity confirmed'],['The feat','A generation of astronomers spent their careers measuring the motion of a point of light']]}
  ],
  facts: ['Astronomers followed a full lap of this star: sixteen years of patience.', 'At its closest point it travels at more than 7,000 kilometers per second.', 'It is the most direct proof that there is a black hole at the center of our galaxy.'],
  fict: 'It is the star that earned a Nobel, and almost nobody outside astronomy knows its name.'
},
s38estrela: {
  kind: 'The second witness of the black hole',
  quick: [['TYPE','K, old'],['YEAR','19 years'],['CLOSEST','~170 AU'],['DISCOVERED','2000s'],['ORBIT','nearly perpendicular to S2\'s'],['ROLE','checks the central mass']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Year','19 Earth years per lap'],['The plane','Nearly perpendicular to S2\'s: together, the two pin down the central mass'],['Position here','Symbolic: the real orbits are extremely tight ellipses']]},
    {t:'RECORD', rows:[['The role','With two stars in different planes, the 4.3 million solar masses have nowhere to hide'],['The difficulty','It is faint and the field is crowded: adaptive optics were needed to separate it']]}
  ],
  facts: ['It is the second best measured orbit around the black hole, after S2.'],
  fict: null
},
s62estrela: {
  kind: 'The fastest star known',
  quick: [['TYPE','~6 Suns'],['YEAR','~10 years'],['CLOSEST','~16 AU'],['SPEED','~8% of light'],['ANNOUNCED','2020'],['STATUS','awaiting confirmation']],
  sections: [
    {t:'ORBIT & ROTATION', rows:[['Year','Some 10 years per lap, the shortest known'],['At periastron','It comes within ~16 AU of the horizon, closer than Uranus is to the Sun'],['The speed','On the plunge, ~8 percent of the speed of light'],['Position here','Symbolic, like the whole scene']]},
    {t:'RECORD', rows:[['The announcement','2020, by the group that has followed the galactic center for decades'],['The caveat','Measuring in such a crowded field is hard: some of its data is still debated'],['If confirmed','It is the best relativity laboratory a star can offer']]}
  ],
  facts: ['At the deepest point of its plunge, it covers the Earth-Moon distance in about 16 seconds.'],
  fict: null
},
ngc6611: {
  kind: 'The stars that carve the Pillars',
  quick: [['TYPE','open cluster'],['RADIUS','~9 R☉ (the largest)'],['AGE','1 to 2 million years'],['STARS','~460'],['DISTANCE','6,500 ly'],['HIGHLIGHT','O5V giants']],
  sections: [
    {t:'STRUCTURE', rows:[['What it is','A nursery with hundreds of young stars, some 80 times more massive than the Sun'],['The age','One to two million years, newborns on cosmic scales'],['The tool','Their ultraviolet radiation evaporates the surrounding gas and carves the columns'],['The fate','The largest ones will explode as supernovae before they turn 10 million years old']]},
    {t:'RECORD', rows:[['Nebula','Messier 16, the Eagle Nebula, in the constellation Serpens'],['Distance','About 6,500 light-years'],['Scale note','This system is shown symbolically: the Pillars are light-years tall and do not orbit anything']]}
  ],
  facts: ['The light of these stars left when the last ice age was still underway on Earth.'],
  fict: null
},
pilares: {
  kind: 'The most famous photograph of the universe',
  quick: [['HEIGHT','4 to 5 light-years'],['DISTANCE','6,500 ly'],['MATERIAL','hydrogen and dust'],['PHOTO','Hubble · 1995'],['REDONE','JWST · 2022'],['INSIDE','stars being born']],
  sections: [
    {t:'SCALE', rows:[['Height','About 4 to 5 light-years, the tallest pillar'],['In perspective','The distance from the Sun to Alpha Centauri would fit inside one of them'],['Comparison','The whole Solar System out to the Oort Cloud is a grain next to this'],['Position here','Symbolic: they do not orbit the star, they are immersed in the nebula']]},
    {t:'RECORD', rows:[['1995','Hubble photographs the columns and the image becomes the face of modern astronomy'],['What they are','Columns of cold gas and dust resisting the radiation of the neighboring young stars'],['Inside them','Dense globules where new stars are forming right now'],['2014','Hubble redid the photo in high definition, 20 years later'],['2022','James Webb pierced the dust in infrared and revealed the hidden stars'],['Already gone?','One hypothesis suggests a supernova has already destroyed them, and the news only arrives in a thousand years']]}
  ],
  facts: ['The 1995 image is probably the most reproduced astronomical photograph in history.', 'The name came from a sermon: the columns where creation happens.', 'If the supernova really erased them, we are still seeing ghosts of light for another thousand years.'],
  fict: 'It became a record cover, a bedroom poster and a recurring science fiction backdrop. Star Trek Voyager used the image, and it even appears on postage stamps.'
},
trapezio: {
  kind: 'The four stars that light up Orion',
  quick: [['TYPE','young cluster'],['RADIUS','~10 R☉ (θ¹C)'],['AGE','~300,000 years'],['STARS','4 main'],['DISTANCE','1,344 ly'],['BRIGHTNESS','200,000 Suns']],
  sections: [
    {t:'STRUCTURE', rows:[['What it is','Four giant stars so young that they are still wrapped in the gas that made them'],['θ¹ Orionis C','The brightest, 40 times the mass of the Sun, with an extremely violent stellar wind'],['The light','It is their radiation that makes the whole nebula glow'],['Age','Three hundred thousand years, a blink: the first humans already walked the Earth']]},
    {t:'RECORD', rows:[['Where','In the middle of Orion\'s sword, visible to the naked eye as a fuzzy patch'],['Neighborhood','About 3,000 stars being born in the same cloud'],['Scale note','The scene here is symbolic: the nebula is 24 light-years across']]}
  ],
  facts: ['If θ¹ Orionis C were where the Sun is, the Earth would be sterilized in minutes.'],
  fict: null
},
nebulosaorion: {
  kind: 'The nebula you can see with the naked eye',
  quick: [['DISTANCE','1,344 ly'],['WIDTH','24 light-years'],['MASS','2,000 Suns'],['STARS','~3,000 being born'],['NAKED EYE','yes ✓'],['CATALOG','M42']],
  sections: [
    {t:'SCALE', rows:[['Width','24 light-years, five times the distance to Alpha Centauri'],['Distance','1,344 light-years, the nearest star-forming region'],['Mass','Enough gas to make 2,000 suns'],['Position here','Symbolic: the nebula surrounds the cluster, it does not orbit anything']]},
    {t:'RECORD', rows:[['Naked eye','The fuzzy patch in the middle of Orion\'s sword. You have seen it without knowing.'],['1610','Peiresc makes the first telescopic record'],['Proplyds','Hubble caught hundreds of protoplanetary disks: solar systems under construction'],['JWST (2023)','Found complex carbon molecules and pairs of free-floating planets, the JuMBOs'],['The future','In a few million years the radiation will scatter it all, leaving a bare cluster']]}
  ],
  facts: ['It is the nearest place where you can watch stars and planets being born right now.', 'It is in everyone\'s sky: point at Orion\'s belt and go down a little.', 'Hubble showed that most of the young stars there have a disk of dust, that is, planets under construction.'],
  fict: 'A must-see in every documentary and on astronomy book covers. In Blade Runner, Roy Batty says he saw attack ships on fire "off the shoulder of Orion".'
},
/* o card do próprio sistema */
__sys: {
  trappist: { hint: '7 WORLDS IN LESS SPACE THAN THE ORBIT OF MERCURY', card: { desig: 'STAR SYSTEM · AQUARIUS', kind: 'Seven compact worlds',
    quick: [['STAR','1 (M8V)'],['PLANETS','7 rocky'],['HABITABLE ZONE','3 of them'],['DISTANCE','40.7 ly'],['DISCOVERED','2016 to 2017'],['SCALE','fits inside the orbit of Mercury']],
    sections: [{t:'RECORD', rows:[['The star','An ultracool red dwarf, slightly larger than Jupiter'],['The prize','e, f and g in the habitable zone, and e is the favorite'],['James Webb','Partial verdict: b (~230 °C) and c (~110 °C) look like bare rock'],['The bet','If one of the habitable-zone planets has an atmosphere, it will be the headline of the decade']]}],
    facts: ['Seen from one planet, the neighbors would look larger than our Moon in the sky.'] } },
  alphacen: { hint: 'TRIPLE SYSTEM · PROXIMA KEEPS TWO PLANETS', card: { desig: 'STAR SYSTEM · CENTAURUS', kind: 'The next-door neighbors',
    quick: [['STARS','3 (A, B and Proxima)'],['PLANETS','2 confirmed'],['DISTANCE','4.24 to 4.37 ly'],['ORBIT A-B','79.9 years'],['HABITABLE ZONE','Proxima b'],['TRIP (today)','~70,000 years']],
    sections: [{t:'RECORD', rows:[['A and B','A Sun-like pair dancing at 11 to 36 AU'],['Proxima','A red dwarf 0.2 ly from the pair, out of scale HERE'],['Why it matters','The nearest system, target number 1 for interstellar probes']]}],
    facts: ['Breakthrough Starshot: light sails would arrive in ~20 years.'] } },
  sirius: { hint: 'THE WHITE DWARF SIRIUS B ORBITS EVERY 50 YEARS', card: { desig: 'STAR SYSTEM · CANIS MAJOR', kind: 'The brightest one + a stellar corpse',
    quick: [['STARS','2 (A1V + white dwarf)'],['DISTANCE','8.6 ly'],['ORBIT','50.1 years'],['BRIGHTNESS','the brightest in the sky'],['PLANETS','none known'],['AGE','~240 million years']],
    sections: [{t:'RECORD', rows:[['Sirius A','White, 25 × the light of the Sun'],['Sirius B','The mass of the Sun in the size of the Earth'],['History','B was predicted by mathematics 18 years before it was seen']]}],
    facts: ['In ancient Egypt, its rising announced the flooding of the Nile.'] } },
  kepler452: { hint: 'HOME OF "EARTH 2.0" · TAP TO VISIT', card: { desig: 'STAR SYSTEM · CYGNUS', kind: 'A glimpse of our future',
    quick: [['STAR','1 (G2, 6 billion years)'],['PLANETS','1 confirmed'],['DISTANCE','~1,800 ly'],['DISCOVERED','2015 · Kepler'],['NICKNAME','Earth 2.0'],['LOCAL YEAR','385 days']],
    sections: [{t:'RECORD', rows:[['The star','Like the Sun, 1.5 billion years older'],['The planet','A super-Earth in the habitable zone for 6 billion years'],['The lesson','It shows how our system may age']]}],
    facts: ['The light we see left there in the Iron Age.'] } },
  betelgeuse: { hint: 'NO PLANET CATALOGED · SUPERGIANT AT THE END OF ITS LIFE', card: { desig: 'STAR SYSTEM · ORION', kind: 'A magnificent time bomb',
    quick: [['STAR','1 supergiant'],['RADIUS','~760 R☉'],['PLANETS','none cataloged'],['DISTANCE','~550 ly'],['AGE','~10 million years'],['FATE','supernova']],
    sections: [{t:'RECORD', rows:[['Scale','In the Sun\'s place, it would swallow even Jupiter'],['2019 to 2020','The Great Dimming: dust knocked the brightness down'],['When it explodes','It will shine like the full Moon, visible by day']]}],
    facts: ['It may have already exploded; the light would take ~550 years to tell us.'] } },
  polaris: { hint: 'THE NORTH STAR · THE EARTH\'S AXIS POINTS HERE', card: { desig: 'STAR SYSTEM · URSA MINOR', kind: 'The still point of the sky',
    quick: [['STAR','triple Cepheid'],['RADIUS','~37 R☉'],['DISTANCE','~433 ly'],['PULSE','4 days'],['NORTH UNTIL','~12,000 years (then Vega)']],
    sections: [{t:'RECORD', rows:[['The post','The Earth\'s axis points almost exactly at it'],['Precession','Thuban was once the north; Vega will be'],['The ruler','A Cepheid: its pulse measures distances across the universe']]}],
    facts: ['In a long-exposure photo of the sky, it is the center of the star trails.'] } },
  aldebaran: { hint: 'ORANGE GIANT · THE FUTURE OF THE SUN', card: { desig: 'STAR SYSTEM · TAURUS', kind: 'The eye of the Bull, an aged Sun',
    quick: [['STAR','1 orange giant'],['RADIUS','~44 R☉'],['PLANETS','1 candidate under debate'],['DISTANCE','65 ly'],['HEADING','Pioneer 10 is traveling here']],
    sections: [{t:'RECORD', rows:[['Scale','44 times the radius of the Sun: it would swallow Mercury with room to spare'],['The Hyades','The V of Taurus lies in the background, at TWICE the distance'],['Occultations','The Moon passes in front of it several times a year']]}],
    facts: ['It is a portrait of the Sun\'s future: a similar star that has already swelled.'] } },
  rigel: { hint: 'BLUE SUPERGIANT · 120,000 SUNS', card: { desig: 'STAR SYSTEM · ORION', kind: 'The blue foot of the hunter',
    quick: [['STAR','blue supergiant (system of 4)'],['RADIUS','~75 R☉'],['BRIGHTNESS','~120,000 Suns'],['DISTANCE','~860 ly'],['FATE','supernova']],
    sections: [{t:'RECORD', rows:[['The contrast','Orion has both: blue Rigel at the foot, red Betelgeuse at the shoulder'],['The Witch','Its light lights up the Witch Head Nebula'],['Family','At least four stars in the system']]}],
    facts: ['The 7th brightest star in the sky, even at 860 light-years.'] } },
  antares: { hint: 'THE RIVAL OF MARS · HEART OF THE SCORPION', card: { desig: 'STAR SYSTEM · SCORPIUS', kind: 'The red rival of Mars',
    quick: [['STAR','supergiant + blue companion'],['RADIUS','~680 R☉'],['MASS','~12 Suns'],['DISTANCE','~550 ly'],['FATE','supernova']],
    sections: [{t:'RECORD', rows:[['Scale','In the Sun\'s place, the surface would reach past the asteroid belt'],['The name','Anti-Ares: the rival of Mars in the sky'],['Antares B','The companion that looks green by contrast']]}],
    facts: ['Every two years Mars passes near it in the sky and the duel of reds happens again.'] } },
  sgra: { hint: 'THE CENTER OF THE MILKY WAY: EVERYTHING HERE ORBITS THIS POINT', card: { desig: 'BLACK HOLE · GALACTIC CENTER', kind: 'Our central address',
    quick: [['MASS','4.3 million Suns'],['DISTANCE','26,000 ly'],['PHOTO','EHT · 2022'],['NOBEL','2020'],['WITNESS','the star S2'],['SUN\'S LAP','230 million years']],
    sections: [{t:'RECORD', rows:[['How we know','Decades measuring stars that orbit an invisible point'],['S2','It passes at 3% of the speed of light and completes a lap in 16 years'],['2022','The Event Horizon Telescope photographed its shadow']]}],
    facts: ['Everything that exists in the Milky Way, including you, is orbiting this point.'] } },
  m16: { hint: 'THE PILLARS OF CREATION: EACH COLUMN IS LIGHT-YEARS TALL', card: { desig: 'STELLAR NURSERY · SERPENS', kind: 'Where stars are born',
    quick: [['DISTANCE','6,500 ly'],['CATALOG','Messier 16'],['AGE','1 to 2 million years'],['PILLARS','4 to 5 ly tall'],['PHOTO','Hubble 1995'],['REVISITED','JWST 2022']],
    sections: [{t:'RECORD', rows:[['The nebula','A giant cloud of hydrogen where hundreds of stars have formed'],['The Pillars','Columns of gas resisting the radiation, with stars being born inside'],['Scale','Each column is taller than the distance from the Sun to Alpha Centauri'],['Warning','The scene here is symbolic: nebulae have no orbits']]}],
    facts: ['The first object on this map that is neither a star nor a planet: it is the cradle of both.'] } },
  orion: { hint: 'YOU HAVE ALREADY SEEN THIS NEBULA WITH THE NAKED EYE, IN THE SWORD OF ORION', card: { desig: 'STELLAR NURSERY · ORION', kind: 'The nearest star factory',
    quick: [['DISTANCE','1,344 ly'],['CATALOG','M42'],['WIDTH','24 ly'],['BEING BORN','~3,000 stars'],['NAKED EYE','yes'],['DISKS','hundreds']],
    sections: [{t:'RECORD', rows:[['What it is','A giant cloud lit by four young stars, the Trapezium'],['Why it matters','It is where we see solar systems forming in real time'],['JWST','Found organic molecules and free-floating planets in pairs, the JuMBOs']]}],
    facts: ['The fuzzy patch in the sword of Orion, which everyone has seen without knowing what it was.'] } },
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
