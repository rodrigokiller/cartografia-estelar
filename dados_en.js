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
