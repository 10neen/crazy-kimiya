/* =============== بيانات العناصر (118) مع الأسماء العربية =============== */
const ELEMENTS = [
  {Z:1,  sym:"H",  name:"Hydrogen",      name_ar:"هيدروجين",      mass:"1.008",   type:"Nonmetal", type_ar:"لافلز", state_ar:"غاز", melting_ar:"-259.16 °م", boiling_ar:"-252.87 °م", density_ar:"0.0899 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"1s¹", uses_ar:"وقود صواريخ، مكون للماء"},
  {Z:2,  sym:"He", name:"Helium",        name_ar:"هيليوم",        mass:"4.0026",  type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"-272.2 °م", boiling_ar:"-268.9 °م", density_ar:"0.1786 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"1s²", uses_ar:"بالونات، تبريد فائق"},
  {Z:3,  sym:"Li", name:"Lithium",       name_ar:"ليثيوم",        mass:"6.94",    type:"Alkali Metal", type_ar:"فلز قلوي", state_ar:"صلب", melting_ar:"180.5 °م", boiling_ar:"1342 °م", density_ar:"534 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[He] 2s¹", uses_ar:"بطاريات، سبائك خفيفة"},
  {Z:4,  sym:"Be", name:"Beryllium",     name_ar:"بيريليوم",      mass:"9.0122",  type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", state_ar:"صلب", melting_ar:"1287 °م", boiling_ar:"2471 °م", density_ar:"1850 كغ/م³", color_ar:"رمادي", electron_config_ar:"[He] 2s²", uses_ar:"سبائك للطائرات والصواريخ"},
  {Z:5,  sym:"B",  name:"Boron",         name_ar:"بورون",         mass:"10.81",   type:"Metalloid", type_ar:"شبه فلز", state_ar:"صلب", melting_ar:"2076 °م", boiling_ar:"3927 °م", density_ar:"2080 كغ/م³", color_ar:"بني-أسود", electron_config_ar:"[He] 2s² 2p¹", uses_ar:"منظفات، زجاج البوروسيليكات"},
  {Z:6,  sym:"C",  name:"Carbon",        name_ar:"كربون",         mass:"12.011",  type:"Nonmetal", type_ar:"لافلز", state_ar:"صلب", melting_ar:"3550 °م", boiling_ar:"4827 °م", density_ar:"2267 كغ/م³", color_ar:"أسود (غرافيت)", electron_config_ar:"[He] 2s² 2p²", uses_ar:"وقود أحفوري، ألماس، غرافيت"},
  {Z:7,  sym:"N",  name:"Nitrogen",      name_ar:"نيتروجين",      mass:"14.007",  type:"Nonmetal", type_ar:"لافلز", state_ar:"غاز", melting_ar:"-210 °م", boiling_ar:"-195.8 °م", density_ar:"1.251 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[He] 2s² 2p³", uses_ar:"مكون رئيسي للهواء، صناعة الأسمدة"},
  {Z:8,  sym:"O",  name:"Oxygen",        name_ar:"أكسجين",        mass:"15.999",  type:"Nonmetal", type_ar:"لافلز", state_ar:"غاز", melting_ar:"-218.8 °م", boiling_ar:"-183 °م", density_ar:"1.429 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[He] 2s² 2p⁴", uses_ar:"التنفس، الاحتراق"},
  {Z:9,  sym:"F",  name:"Fluorine",      name_ar:"فلور",          mass:"18.998",  type:"Halogen", type_ar:"هالوجين", state_ar:"غاز", melting_ar:"-219.62 °م", boiling_ar:"-188.12 °م", density_ar:"1.696 غ/لتر", color_ar:"أصفر-بني فاتح", electron_config_ar:"[He] 2s² 2p⁵", uses_ar:"معجون الأسنان، التبريد"},
  {Z:10, sym:"Ne", name:"Neon",          name_ar:"نيون",          mass:"20.180",  type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"-248.59 °م", boiling_ar:"-246.08 °م", density_ar:"0.8999 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[He] 2s² 2p⁶", uses_ar:"إضاءة النيون، الليزر"},
  {Z:11, sym:"Na", name:"Sodium",        name_ar:"صوديوم",        mass:"22.990",  type:"Alkali Metal", type_ar:"فلز قلوي", state_ar:"صلب", melting_ar:"97.72 °م", boiling_ar:"882.9 °م", density_ar:"968 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Ne] 3s¹", uses_ar:"ملح الطعام، تبريد المفاعلات"},
  {Z:12, sym:"Mg", name:"Magnesium",     name_ar:"ماغنسيوم",      mass:"24.305",  type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", state_ar:"صلب", melting_ar:"650 °م", boiling_ar:"1091 °م", density_ar:"1738 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Ne] 3s²", uses_ar:"سبائك للطائرات، ألعاب نارية"},
  {Z:13, sym:"Al", name:"Aluminium",     name_ar:"ألومنيوم",      mass:"26.982",  type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"660.32 °م", boiling_ar:"2519 °م", density_ar:"2700 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Ne] 3s² 3p¹", uses_ar:"أدوات المطبخ، هياكل الطائرات"},
  {Z:14, sym:"Si", name:"Silicon",       name_ar:"سيليكون",       mass:"28.085",  type:"Metalloid", type_ar:"شبه فلز", state_ar:"صلب", melting_ar:"1414 °م", boiling_ar:"3265 °م", density_ar:"2329 كغ/م³", color_ar:"رمادي غامق", electron_config_ar:"[Ne] 3s² 3p²", uses_ar:"إلكترونيات، زجاج، خزف"},
  {Z:15, sym:"P",  name:"Phosphorus",    name_ar:"فسفور",         mass:"30.974",  type:"Nonmetal", type_ar:"لافلز", state_ar:"صلب", melting_ar:"44.1 °م", boiling_ar:"280.5 °م", density_ar:"1823 كغ/م³", color_ar:"أبيض، أحمر، أسود", electron_config_ar:"[Ne] 3s² 3p³", uses_ar:"أسمدة، أعواد ثقاب، منظفات"},
  {Z:16, sym:"S",  name:"Sulfur",        name_ar:"كبريت",         mass:"32.06",   type:"Nonmetal", type_ar:"لافلز", state_ar:"صلب", melting_ar:"115.21 °م", boiling_ar:"444.6 °م", density_ar:"2070 كغ/م³", color_ar:"أصفر", electron_config_ar:"[Ne] 3s² 3p⁴", uses_ar:"حمض الكبريتيك، أسمدة، مبيدات حشرية"},
  {Z:17, sym:"Cl", name:"Chlorine",      name_ar:"كلور",          mass:"35.45",   type:"Halogen", type_ar:"هالوجين", state_ar:"غاز", melting_ar:"-101.5 °م", boiling_ar:"-34.04 °م", density_ar:"3.214 غ/لتر", color_ar:"أخضر مصفر", electron_config_ar:"[Ne] 3s² 3p⁵", uses_ar:"تنقية المياه، مبيضات"},
  {Z:18, sym:"Ar", name:"Argon",         name_ar:"أرغون",         mass:"39.948",  type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"-189.3 °م", boiling_ar:"-185.8 °م", density_ar:"1.784 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[Ne] 3s² 3p⁶", uses_ar:"إضاءة، لحام القوس الكهربائي"},
  {Z:19, sym:"K",  name:"Potassium",     name_ar:"بوتاسيوم",      mass:"39.098",  type:"Alkali Metal", type_ar:"فلز قلوي", state_ar:"صلب", melting_ar:"63.5 °م", boiling_ar:"759 °م", density_ar:"856 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Ar] 4s¹", uses_ar:"أسمدة، متفجرات، مكون غذائي"},
  {Z:20, sym:"Ca", name:"Calcium",       name_ar:"كالسيوم",       mass:"40.078",  type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", state_ar:"صلب", melting_ar:"842 °م", boiling_ar:"1484 °م", density_ar:"1550 كغ/م³", color_ar:"فضي", electron_config_ar:"[Ar] 4s²", uses_ar:"بناء العظام، الأسمنت، الجبس"},
  {Z:21, sym:"Sc", name:"Scandium",      name_ar:"سكانديوم",      mass:"44.956",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1541 °م", boiling_ar:"2836 °م", density_ar:"2985 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Ar] 3d¹ 4s²", uses_ar:"سبائك للطائرات، مصابيح التفريغ"},
  {Z:22, sym:"Ti", name:"Titanium",      name_ar:"تيتانيوم",      mass:"47.867",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1668 °م", boiling_ar:"3287 °م", density_ar:"4506 كغ/م³", color_ar:"فضي", electron_config_ar:"[Ar] 3d² 4s²", uses_ar:"هياكل الطائرات، مفاصل صناعية"},
  {Z:23, sym:"V",  name:"Vanadium",      name_ar:"فاناديوم",      mass:"50.942",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1910 °م", boiling_ar:"3407 °م", density_ar:"6110 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Ar] 3d³ 4s²", uses_ar:"سبائك الفولاذ، أدوات الجراحة"},
  {Z:24, sym:"Cr", name:"Chromium",      name_ar:"كروم",          mass:"51.996",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1907 °م", boiling_ar:"2671 °م", density_ar:"7150 كغ/م³", color_ar:"فضي", electron_config_ar:"[Ar] 3d⁵ 4s¹", uses_ar:"طلاء، فولاذ مقاوم للصدأ، صبغات"},
  {Z:25, sym:"Mn", name:"Manganese",     name_ar:"منجنيز",        mass:"54.938",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1246 °م", boiling_ar:"2061 °م", density_ar:"7440 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Ar] 3d⁵ 4s²", uses_ar:"سبائك الصلب، بطاريات جافة"},
  {Z:26, sym:"Fe", name:"Iron",          name_ar:"حديد",          mass:"55.845",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1538 °م", boiling_ar:"2862 °م", density_ar:"7874 كغ/م³", color_ar:"فضي-رمادي لامع", electron_config_ar:"[Ar] 3d⁶ 4s²", uses_ar:"هياكل بناء، سيارات، أدوات"},
  {Z:27, sym:"Co", name:"Cobalt",        name_ar:"كوبالت",        mass:"58.933",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1495 °م", boiling_ar:"2927 °م", density_ar:"8900 كغ/م³", color_ar:"رمادي صلب", electron_config_ar:"[Ar] 3d⁷ 4s²", uses_ar:"بطاريات، سبائك فائقة، صبغات"},
  {Z:28, sym:"Ni", name:"Nickel",        name_ar:"نيكل",          mass:"58.693",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1455 °م", boiling_ar:"2913 °م", density_ar:"8908 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Ar] 3d⁸ 4s²", uses_ar:"سبائك، عملات معدنية، بطاريات"},
  {Z:29, sym:"Cu", name:"Copper",        name_ar:"نحاس",          mass:"63.546",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1084.6 °م", boiling_ar:"2560 °م", density_ar:"8960 كغ/م³", color_ar:"أحمر-برتقالي", electron_config_ar:"[Ar] 3d¹⁰ 4s¹", uses_ar:"أسلاك كهربائية، عملات، أنابيب"},
  {Z:30, sym:"Zn", name:"Zinc",          name_ar:"زنك",           mass:"65.38",   type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"419.5 °م", boiling_ar:"907 °م", density_ar:"7140 كغ/م³", color_ar:"أزرق-أبيض لامع", electron_config_ar:"[Ar] 3d¹⁰ 4s²", uses_ar:"تغطية الحديد، بطاريات، سبائك"},
  {Z:31, sym:"Ga", name:"Gallium",       name_ar:"غاليوم",        mass:"69.723",  type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"29.76 °م", boiling_ar:"2204 °م", density_ar:"5910 كغ/م³", color_ar:"فضي", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p¹", uses_ar:"أجهزة إلكترونية، سبائك منخفضة الذوبان"},
  {Z:32, sym:"Ge", name:"Germanium",     name_ar:"جرمانيوم",      mass:"72.630",  type:"Metalloid", type_ar:"شبه فلز", state_ar:"صلب", melting_ar:"938.2 °م", boiling_ar:"2833 °م", density_ar:"5323 كغ/م³", color_ar:"رمادي-أبيض", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p²", uses_ar:"أشباه موصلات، ألياف بصرية، عدسات"},
  {Z:33, sym:"As", name:"Arsenic",       name_ar:"زرنيخ",         mass:"74.922",  type:"Metalloid", type_ar:"شبه فلز", state_ar:"صلب", melting_ar:"817 °م", boiling_ar:"614 °م (تسامي)", density_ar:"5727 كغ/م³", color_ar:"رمادي لامع", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p³", uses_ar:"مبيدات حشرية، سبائك، أشباه موصلات"},
  {Z:34, sym:"Se", name:"Selenium",      name_ar:"سيلينيوم",      mass:"78.971",  type:"Nonmetal", type_ar:"لافلز", state_ar:"صلب", melting_ar:"221 °م", boiling_ar:"685 °م", density_ar:"4810 كغ/م³", color_ar:"رمادي، أحمر، أسود", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p⁴", uses_ar:"زجاج أحمر، نسخ ضوئي، خلايا شمسية"},
  {Z:35, sym:"Br", name:"Bromine",       name_ar:"بروم",          mass:"79.904",  type:"Halogen", type_ar:"هالوجين", state_ar:"سائل", melting_ar:"-7.2 °م", boiling_ar:"58.8 °م", density_ar:"3120 كغ/م³", color_ar:"أحمر-بني", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p⁵", uses_ar:"مثبطات اللهب، مطهرات، مبيدات حشرية"},
  {Z:36, sym:"Kr", name:"Krypton",       name_ar:"كريبتون",       mass:"83.798",  type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"-157.36 °م", boiling_ar:"-153.22 °م", density_ar:"3.749 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[Ar] 3d¹⁰ 4s² 4p⁶", uses_ar:"مصابيح فلورسنت، ليزر"},
  {Z:37, sym:"Rb", name:"Rubidium",      name_ar:"روبيديوم",      mass:"85.468",  type:"Alkali Metal", type_ar:"فلز قلوي", state_ar:"صلب", melting_ar:"39.31 °م", boiling_ar:"688 °م", density_ar:"1532 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 5s¹", uses_ar:"خلايا كهروضوئية، قنابل دخان"},
  {Z:38, sym:"Sr", name:"Strontium",     name_ar:"سترونشيوم",     mass:"87.62",   type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", state_ar:"صلب", melting_ar:"777 °م", boiling_ar:"1382 °م", density_ar:"2640 كغ/م³", color_ar:"فضي-أصفر", electron_config_ar:"[Kr] 5s²", uses_ar:"ألعاب نارية، إشارات استغاثة"},
  {Z:39, sym:"Y",  name:"Yttrium",       name_ar:"إتريوم",        mass:"88.906",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1522 °م", boiling_ar:"3338 °م", density_ar:"4472 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹ 5s²", uses_ar:"أجهزة ليزر، شاشات تلفزيون"},
  {Z:40, sym:"Zr", name:"Zirconium",     name_ar:"زركونيوم",      mass:"91.224",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1855 °م", boiling_ar:"4409 °م", density_ar:"6520 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d² 5s²", uses_ar:"مفاعلات نووية، سبائك، سيراميك"},
  {Z:41, sym:"Nb", name:"Niobium",       name_ar:"نيوبيوم",       mass:"92.906",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"2477 °م", boiling_ar:"4744 °م", density_ar:"8570 كغ/م³", color_ar:"رمادي-فضي", electron_config_ar:"[Kr] 4d⁴ 5s¹", uses_ar:"سبائك فائقة، أنابيب غاز، مغناطيس فائق"},
  {Z:42, sym:"Mo", name:"Molybdenum",    name_ar:"موليبدينوم",    mass:"95.95",   type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"2623 °م", boiling_ar:"4639 °م", density_ar:"10280 كغ/م³", color_ar:"رمادي-فضي", electron_config_ar:"[Kr] 4d⁵ 5s¹", uses_ar:"سبائك فولاذ، أقطاب كهربائية، صبغات"},
  {Z:43, sym:"Tc", name:"Technetium",    name_ar:"تكنيتيوم",      mass:"[98]",    type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"2157 °م", boiling_ar:"4265 °م", density_ar:"11500 كغ/م³", color_ar:"رمادي-فضي", electron_config_ar:"[Kr] 4d⁵ 5s²", uses_ar:"مادة مشعة، تطبيقات طبية (التصوير)"},
  {Z:44, sym:"Ru", name:"Ruthenium",     name_ar:"روثينيوم",      mass:"101.07",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"2334 °م", boiling_ar:"4150 °م", density_ar:"12450 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d⁷ 5s¹", uses_ar:"سبائك بلاتينية، محفزات كيميائية"},
  {Z:45, sym:"Rh", name:"Rhodium",       name_ar:"روديوم",        mass:"102.91",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1964 °م", boiling_ar:"3695 °م", density_ar:"12410 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d⁸ 5s¹", uses_ar:"محفزات السيارات، مجوهرات"},
  {Z:46, sym:"Pd", name:"Palladium",     name_ar:"بالاديوم",      mass:"106.42",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1554.9 °م", boiling_ar:"2963 °م", density_ar:"12020 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰", uses_ar:"مجوهرات، طب الأسنان، محفزات"},
  {Z:47, sym:"Ag", name:"Silver",        name_ar:"فضة",           mass:"107.868", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"961.78 °م", boiling_ar:"2162 °م", density_ar:"10490 كغ/م³", color_ar:"فضي-أبيض لامع", electron_config_ar:"[Kr] 4d¹⁰ 5s¹", uses_ar:"مجوهرات، عملات، تصوير فوتوغرافي"},
  {Z:48, sym:"Cd", name:"Cadmium",       name_ar:"كادميوم",       mass:"112.41",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"321.07 °م", boiling_ar:"767 °م", density_ar:"8650 كغ/م³", color_ar:"أزرق-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s²", uses_ar:"بطاريات، طلاء، صبغات"},
  {Z:49, sym:"In", name:"Indium",        name_ar:"إنديوم",        mass:"114.818", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"156.6 °م", boiling_ar:"2072 °م", density_ar:"7310 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p¹", uses_ar:"شاشات، لحام، سبائك"},
  {Z:50, sym:"Sn", name:"Tin",           name_ar:"قصدير",         mass:"118.71",  type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"231.93 °م", boiling_ar:"2602 °م", density_ar:"7310 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p²", uses_ar:"تغليف الأغذية، لحام، برونز"},
  {Z:51, sym:"Sb", name:"Antimony",      name_ar:"أنتيمون",       mass:"121.760", type:"Metalloid", type_ar:"شبه فلز", state_ar:"صلب", melting_ar:"630.63 °م", boiling_ar:"1587 °م", density_ar:"6697 كغ/م³", color_ar:"فضي لامع", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p³", uses_ar:"سبائك، مثبطات اللهب، أشباه موصلات"},
  {Z:52, sym:"Te", name:"Tellurium",     name_ar:"تيلوريوم",      mass:"127.60",  type:"Metalloid", type_ar:"شبه فلز", state_ar:"صلب", melting_ar:"449.5 °م", boiling_ar:"988 °م", density_ar:"6240 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p⁴", uses_ar:"سبائك، خلايا شمسية، صبغ السيراميك"},
  {Z:53, sym:"I",  name:"Iodine",        name_ar:"يود",           mass:"126.90",  type:"Halogen", type_ar:"هالوجين", state_ar:"صلب", melting_ar:"113.7 °م", boiling_ar:"184.3 °م", density_ar:"4930 كغ/م³", color_ar:"أسود مزرق", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p⁵", uses_ar:"مطهر، علاج الغدة الدرقية، صبغات"},
  {Z:54, sym:"Xe", name:"Xenon",         name_ar:"زينون",         mass:"131.293", type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"-111.75 °م", boiling_ar:"-108.12 °م", density_ar:"5.894 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[Kr] 4d¹⁰ 5s² 5p⁶", uses_ar:"إضاءة، تخدير، محركات الدفع الفضائية"},
  {Z:55, sym:"Cs", name:"Cesium",        name_ar:"سيزيوم",        mass:"132.905", type:"Alkali Metal", type_ar:"فلز قلوي", state_ar:"صلب", melting_ar:"28.44 °م", boiling_ar:"671 °م", density_ar:"1930 كغ/م³", color_ar:"فضي-ذهبي", electron_config_ar:"[Xe] 6s¹", uses_ar:"ساعات ذرية، خلايا كهروضوئية"},
  {Z:56, sym:"Ba", name:"Barium",        name_ar:"باريوم",        mass:"137.327", type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", state_ar:"صلب", melting_ar:"727 °م", boiling_ar:"1897 °م", density_ar:"3510 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 6s²", uses_ar:"ألعاب نارية، سبائك، مواد إلكترونية"},
  {Z:57, sym:"La", name:"Lanthanum",     name_ar:"لانثانوم",      mass:"138.905", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"920 °م", boiling_ar:"3464 °م", density_ar:"6162 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 5d¹ 6s²", uses_ar:"عدسات الكاميرا، مصابيح القوس الكربوني"},
  {Z:58, sym:"Ce", name:"Cerium",        name_ar:"سيريوم",        mass:"140.116", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"795 °م", boiling_ar:"3443 °م", density_ar:"6770 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹ 5d¹ 6s²", uses_ar:"محفزات السيارات، مصابيح الغاز"},
  {Z:59, sym:"Pr", name:"Praseodymium",  name_ar:"براسيوديميوم",  mass:"140.908", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"935 °م", boiling_ar:"3520 °م", density_ar:"6770 كغ/م³", color_ar:"فضي-أصفر", electron_config_ar:"[Xe] 4f³ 6s²", uses_ar:"نظارات اللحام، مغناطيس دائم"},
  {Z:60, sym:"Nd", name:"Neodymium",     name_ar:"نيوديميوم",     mass:"144.242", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1021 °م", boiling_ar:"3074 °م", density_ar:"7010 كغ/م³", color_ar:"فضي-أصفر", electron_config_ar:"[Xe] 4f⁴ 6s²", uses_ar:"مغناطيس، أجهزة ليزر، زجاج ملون"},
  {Z:61, sym:"Pm", name:"Promethium",    name_ar:"بروميثيوم",     mass:"[145]",   type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1042 °م", boiling_ar:"3000 °م", density_ar:"7260 كغ/م³", color_ar:"فضي-أصفر", electron_config_ar:"[Xe] 4f⁵ 6s²", uses_ar:"مصادر طاقة محمولة، قياس السماكة"},
  {Z:62, sym:"Sm", name:"Samarium",      name_ar:"ساماريوم",      mass:"150.36",  type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1072 °م", boiling_ar:"1794 °م", density_ar:"7520 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Xe] 4f⁶ 6s²", uses_ar:"مغناطيس دائم، محفزات"},
  {Z:63, sym:"Eu", name:"Europium",      name_ar:"يوروبيوم",      mass:"151.964", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"822 °م", boiling_ar:"1529 °م", density_ar:"5244 كغ/م³", color_ar:"فضي", electron_config_ar:"[Xe] 4f⁷ 6s²", uses_ar:"أجهزة ليزر، شاشات تلفزيون ملونة"},
  {Z:64, sym:"Gd", name:"Gadolinium",    name_ar:"جادولينيوم",    mass:"157.25",  type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1313 °م", boiling_ar:"3273 °م", density_ar:"7901 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f⁷ 5d¹ 6s²", uses_ar:"تصوير بالرنين المغناطيسي (MRI)، مفاعلات نووية"},
  {Z:65, sym:"Tb", name:"Terbium",       name_ar:"تيربيوم",       mass:"158.925", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1356 °م", boiling_ar:"3230 °م", density_ar:"8219 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Xe] 4f⁹ 6s²", uses_ar:"شاشات فلورسنت، سبائك"},
  {Z:66, sym:"Dy", name:"Dysprosium",    name_ar:"ديسبروسيوم",    mass:"162.500", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1412 °م", boiling_ar:"2567 °م", density_ar:"8550 كغ/م³", color_ar:"فضي", electron_config_ar:"[Xe] 4f¹⁰ 6s²", uses_ar:"مغناطيس دائم، مفاعلات نووية"},
  {Z:67, sym:"Ho", name:"Holmium",       name_ar:"هولميوم",       mass:"164.930", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1474 °م", boiling_ar:"2700 °م", density_ar:"8795 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹¹ 6s²", uses_ar:"مغناطيس، ليزر"},
  {Z:68, sym:"Er", name:"Erbium",        name_ar:"إربيوم",        mass:"167.259", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1529 °م", boiling_ar:"2868 °م", density_ar:"9066 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹² 6s²", uses_ar:"ألياف بصرية، أجهزة ليزر طبية"},
  {Z:69, sym:"Tm", name:"Thulium",       name_ar:"ثوليوم",        mass:"168.934", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1545 °م", boiling_ar:"1950 °م", density_ar:"9320 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Xe] 4f¹³ 6s²", uses_ar:"مصادر أشعة سينية محمولة، ليزر"},
  {Z:70, sym:"Yb", name:"Ytterbium",     name_ar:"إتيربيوم",      mass:"173.045", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"819 °م", boiling_ar:"1196 °م", density_ar:"6965 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 6s²", uses_ar:"مؤشر ضوئي، مفاعلات نووية"},
  {Z:71, sym:"Lu", name:"Lutetium",      name_ar:"لوتيتيوم",      mass:"174.967", type:"Lanthanide", type_ar:"لانثانيد", state_ar:"صلب", melting_ar:"1663 °م", boiling_ar:"3402 °م", density_ar:"9840 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d¹ 6s²", uses_ar:"محفزات، علاج الأورام"},
  {Z:72, sym:"Hf", name:"Hafnium",       name_ar:"هافنيوم",       mass:"178.49",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"2233 °م", boiling_ar:"4603 °م", density_ar:"13310 كغ/م³", color_ar:"فضي", electron_config_ar:"[Xe] 4f¹⁴ 5d² 6s²", uses_ar:"قضبان تحكم في المفاعلات النووية، سبائك"},
  {Z:73, sym:"Ta", name:"Tantalum",      name_ar:"تانتالوم",      mass:"180.948", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"3017 °م", boiling_ar:"5458 °م", density_ar:"16690 كغ/م³", color_ar:"أزرق-رمادي", electron_config_ar:"[Xe] 4f¹⁴ 5d³ 6s²", uses_ar:"أدوات جراحية، محركات الطائرات النفاثة"},
  {Z:74, sym:"W",  name:"Tungsten",      name_ar:"تنجستن",        mass:"183.84",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"3422 °م", boiling_ar:"5930 °م", density_ar:"19300 كغ/م³", color_ar:"رمادي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁴ 6s²", uses_ar:"خيوط المصابيح الكهربائية، سبائك الفولاذ"},
  {Z:75, sym:"Re", name:"Rhenium",       name_ar:"رينيوم",        mass:"186.207", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"3186 °م", boiling_ar:"5596 °م", density_ar:"21020 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁵ 6s²", uses_ar:"محركات الطائرات النفاثة، سبائك فائقة"},
  {Z:76, sym:"Os", name:"Osmium",        name_ar:"أوزميوم",       mass:"190.23",  type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"3033 °م", boiling_ar:"5012 °م", density_ar:"22590 كغ/م³", color_ar:"أزرق-رمادي", electron_config_ar:"[Xe] 4f¹⁴ 5d⁶ 6s²", uses_ar:"أقلام حبر، سبائك صلبة، أجهزة قياس"},
  {Z:77, sym:"Ir", name:"Iridium",       name_ar:"إيريديوم",      mass:"192.217", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"2446 °م", boiling_ar:"4428 °م", density_ar:"22560 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁷ 6s²", uses_ar:"سبائك، أقلام حبر، مقاييس الوزن"},
  {Z:78, sym:"Pt", name:"Platinum",      name_ar:"بلاتين",        mass:"195.084", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1768.3 °م", boiling_ar:"3825 °م", density_ar:"21450 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d⁹ 6s¹", uses_ar:"مجوهرات، محفزات السيارات، مختبرات"},
  {Z:79, sym:"Au", name:"Gold",          name_ar:"ذهب",           mass:"196.967", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"1064.18 °م", boiling_ar:"2856 °م", density_ar:"19300 كغ/م³", color_ar:"أصفر", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s¹", uses_ar:"مجوهرات، عملات، إلكترونيات"},
  {Z:80, sym:"Hg", name:"Mercury",       name_ar:"زئبق",          mass:"200.592", type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"سائل", melting_ar:"-38.83 °م", boiling_ar:"356.73 °م", density_ar:"13534 كغ/م³", color_ar:"فضي", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s²", uses_ar:"مقياس حرارة، بارومتر"},
  {Z:81, sym:"Tl", name:"Thallium",      name_ar:"ثاليوم",        mass:"204.38",  type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"304 °م", boiling_ar:"1473 °م", density_ar:"11850 كغ/م³", color_ar:"رمادي-أزرق", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", uses_ar:"خلايا كهروضوئية، أجهزة كشف الأشعة تحت الحمراء"},
  {Z:82, sym:"Pb", name:"Lead",          name_ar:"رصاص",          mass:"207.2",   type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"327.46 °م", boiling_ar:"1749 °م", density_ar:"11340 كغ/م³", color_ar:"أزرق-أبيض", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", uses_ar:"بطاريات، حماية من الإشعاع، سبائك"},
  {Z:83, sym:"Bi", name:"Bismuth",       name_ar:"بزموت",         mass:"208.980", type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"271.4 °م", boiling_ar:"1564 °م", density_ar:"9780 كغ/م³", color_ar:"وردي-فضي", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", uses_ar:"مستحضرات تجميل، أدوية، سبائك منخفضة الذوبان"},
  {Z:84, sym:"Po", name:"Polonium",      name_ar:"بولونيوم",      mass:"[209]",   type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"254 °م", boiling_ar:"962 °م", density_ar:"9320 كغ/م³", color_ar:"فضي-أسود", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", uses_ar:"مصادر حرارة نووية، مضاد للكهرباء الساكنة"},
  {Z:85, sym:"At", name:"Astatine",      name_ar:"أستاتين",       mass:"[210]",   type:"Halogen", type_ar:"هالوجين", state_ar:"صلب", melting_ar:"302 °م", boiling_ar:"337 °م", density_ar:"غير معروفة", color_ar:"أسود", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", uses_ar:"علاج السرطان (طب نووي)"},
  {Z:86, sym:"Rn", name:"Radon",         name_ar:"رادون",         mass:"[222]",   type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"-71 °م", boiling_ar:"-61.7 °م", density_ar:"9.73 غ/لتر", color_ar:"عديم اللون", electron_config_ar:"[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", uses_ar:"علاج السرطان، أبحاث الزلازل"},
  {Z:87, sym:"Fr", name:"Francium",      name_ar:"فرانسيوم",      mass:"[223]",   type:"Alkali Metal", type_ar:"فلز قلوي", state_ar:"صلب", melting_ar:"27 °م", boiling_ar:"677 °م", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 7s¹", uses_ar:"لا توجد استخدامات معروفة بسبب ندرته وقصر عمره"},
  {Z:88, sym:"Ra", name:"Radium",        name_ar:"راديوم",        mass:"226",     type:"Alkaline Earth Metal", type_ar:"فلز قلوي أرضي", state_ar:"صلب", melting_ar:"700 °م", boiling_ar:"1737 °م", density_ar:"5500 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 7s²", uses_ar:"دهانات مضيئة (قديمًا)، علاج السرطان (قديمًا)"},
  {Z:89, sym:"Ac", name:"Actinium",      name_ar:"أكتينيوم",      mass:"227",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1050 °م", boiling_ar:"3200 °م", density_ar:"10070 كغ/م³", color_ar:"فضي", electron_config_ar:"[Rn] 6d¹ 7s²", uses_ar:"مصادر نيوترونات، تطبيقات طبية (تجريبي)"},
  {Z:90, sym:"Th", name:"Thorium",       name_ar:"ثوريوم",        mass:"232.038", type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1750 °م", boiling_ar:"4788 °م", density_ar:"11724 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 6d² 7s²", uses_ar:"مفاعلات نووية، زجاج عالي الجودة، مصابيح غاز"},
  {Z:91, sym:"Pa", name:"Protactinium",  name_ar:"بروتاكتينيوم",  mass:"231.036", type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1568 °م", boiling_ar:"4027 °م", density_ar:"15370 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Rn] 5f² 6d¹ 7s²", uses_ar:"أبحاث علمية (مادة شديدة السُمية)"},
  {Z:92, sym:"U",  name:"Uranium",       name_ar:"يورانيوم",      mass:"238.029", type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1132.3 °م", boiling_ar:"4131 °م", density_ar:"19050 كغ/م³", color_ar:"فضي-رمادي", electron_config_ar:"[Rn] 5f³ 6d¹ 7s²", uses_ar:"وقود نووي، أسلحة نووية، تصوير بالأشعة السينية"},
  {Z:93, sym:"Np", name:"Neptunium",     name_ar:"نبتونيوم",      mass:"237",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"639 °م", boiling_ar:"4174 °م", density_ar:"20450 كغ/م³", color_ar:"فضي", electron_config_ar:"[Rn] 5f⁴ 6d¹ 7s²", uses_ar:"مستشعرات نيوترونات، مكونات عسكرية"},
  {Z:94, sym:"Pu", name:"Plutonium",     name_ar:"بلوتونيوم",     mass:"244",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"639.4 °م", boiling_ar:"3228 °م", density_ar:"19816 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 5f⁶ 7s²", uses_ar:"أسلحة نووية، وقود نووي"},
  {Z:95, sym:"Am", name:"Americium",     name_ar:"أميريسيوم",     mass:"243",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1176 °م", boiling_ar:"2607 °م", density_ar:"13670 كغ/م³", color_ar:"فضي-أبيض", electron_config_ar:"[Rn] 5f⁷ 7s²", uses_ar:"كاشف دخان، مصادر إشعاع للبحث"},
  {Z:96, sym:"Cm", name:"Curium",        name_ar:"كوريوم",        mass:"247",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1340 °م", boiling_ar:"3100 °م", density_ar:"13510 كغ/م³", color_ar:"فضي", electron_config_ar:"[Rn] 5f⁷ 6d¹ 7s²", uses_ar:"مصدر للطاقة الحرارية في المركبات الفضائية"},
  {Z:97, sym:"Bk", name:"Berkelium",     name_ar:"بركليوم",       mass:"247",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"986 °م", boiling_ar:"2627 °م", density_ar:"14780 كغ/م³", color_ar:"فضي", electron_config_ar:"[Rn] 5f⁹ 7s²", uses_ar:"لا توجد استخدامات عملية معروفة"},
  {Z:98, sym:"Cf", name:"Californium",   name_ar:"كاليفورنيوم",   mass:"251",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"900 °م", boiling_ar:"1470 °م", density_ar:"15100 كغ/م³", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁰ 7s²", uses_ar:"مصادر نيوترونات، أبحاث علمية"},
  {Z:99, sym:"Es", name:"Einsteinium",   name_ar:"أينشتاينيوم",   mass:"252",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"860 °م", boiling_ar:"996 °م", density_ar:"8840 كغ/م³", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹¹ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:100,sym:"Fm", name:"Fermium",       name_ar:"فيرميوم",       mass:"257",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1527 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹² 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:101,sym:"Md", name:"Mendelevium",   name_ar:"مندليفيوم",     mass:"258",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"827 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹³ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:102,sym:"No", name:"Nobelium",      name_ar:"نوبليوم",       mass:"259",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"827 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:103,sym:"Lr", name:"Lawrencium",    name_ar:"لورنسيوم",      mass:"266",     type:"Actinide", type_ar:"أكتينيد", state_ar:"صلب", melting_ar:"1627 °م", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:104,sym:"Rf", name:"Rutherfordium", name_ar:"روذرفورديوم",   mass:"267",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d² 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:105,sym:"Db", name:"Dubnium",       name_ar:"دوبنيوم",       mass:"268",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d³ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:106,sym:"Sg", name:"Seaborgium",    name_ar:"سيبورجيوم",     mass:"269",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁴ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:107,sym:"Bh", name:"Bohrium",       name_ar:"بوريوم",        mass:"270",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁵ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:108,sym:"Hs", name:"Hassium",       name_ar:"هاسيوم",        mass:"269",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁶ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:109,sym:"Mt", name:"Meitnerium",    name_ar:"مايتنريوم",     mass:"278",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁷ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:110,sym:"Ds", name:"Darmstadtium",  name_ar:"دارمشتادتيوم",  mass:"281",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁸ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:111,sym:"Rg", name:"Roentgenium",   name_ar:"رونتجينيوم",    mass:"282",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d⁹ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:112,sym:"Cn", name:"Copernicium",   name_ar:"كوبرنيسيوم",    mass:"285",     type:"Transition Metal", type_ar:"فلز انتقالي", state_ar:"غاز", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s²", uses_ar:"أبحاث علمية بحتة"},
  {Z:113,sym:"Nh", name:"Nihonium",      name_ar:"نيهونيوم",      mass:"286",     type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"430 °م", boiling_ar:"1100 °م", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", uses_ar:"أبحاث علمية بحتة"},
  {Z:114,sym:"Fl", name:"Flerovium",     name_ar:"فليروفيوم",     mass:"289",     type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", uses_ar:"أبحاث علمية بحتة"},
  {Z:115,sym:"Mc", name:"Moscovium",     name_ar:"موسكوفيوم",     mass:"290",     type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"400 °م", boiling_ar:"1100 °م", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", uses_ar:"أبحاث علمية بحتة"},
  {Z:116,sym:"Lv", name:"Livermorium",   name_ar:"ليفرموريوم",    mass:"293",     type:"Post-transition Metal", type_ar:"فلز بعد انتقالي", state_ar:"صلب", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", uses_ar:"أبحاث علمية بحتة"},
  {Z:117,sym:"Ts", name:"Tennessine",    name_ar:"تينيسين",       mass:"294",     type:"Halogen", type_ar:"هالوجين", state_ar:"صلب", melting_ar:"350 °م", boiling_ar:"550 °م", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", uses_ar:"أبحاث علمية بحتة"},
  {Z:118,sym:"Og", name:"Oganesson",     name_ar:"أوغانيسون",     mass:"294",     type:"Noble Gas", type_ar:"غاز نبيل", state_ar:"غاز", melting_ar:"غير معروف", boiling_ar:"غير معروف", density_ar:"غير معروفة", color_ar:"غير معروف", electron_config_ar:"[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", uses_ar:"أبحاث علمية بحتة"},
];


/* خريطة سريعة للبحث بالرمز */
const MAP = Object.fromEntries(ELEMENTS.map(e => [e.sym, e]));
/* مصفوفات التخطيط حسب الصفوف (18 عمود) */
const PERIOD_ROWS = [
  ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
  ["Li","Be","","","","","","","","","","","B","C","N","O","F","Ne"],
  ["Na","Mg","","","","","","","","","","","Al","Si","P","S","Cl","Ar"],
  ["K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr"],
  ["Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe"],
  ["Cs","Ba","La","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn"],
  ["Fr","Ra","Ac","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"],
];
/* صفوف F-block */
const LANTHANIDES = ["La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu"];
const ACTINIDES    = ["Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"];




/* بناء خلية عنصر */
function createElementCell(sym){
  if(!sym){
    const sp = document.createElement("div");
    sp.className = "spacer";
    return sp;
  }

  const data = MAP[sym];
  const el = document.createElement("div");
  el.className = "element";

  // ✅ الخصائص المطلوبة لربط الألوان
  el.dataset.symbol = data.sym;
  el.dataset.type = data.type;
  el.dataset.typeAr = data.type_ar;
  el.dataset.group = formatGroup(data.type); // ← الزقة السحرية

  // ✅ محتوى العنصر
  el.innerHTML = `
    <div class="element-content">
        <div class="atomic-number">${data.Z}</div>
        <div class="symbol-large">${data.sym}</div>
        <div class="arabic-name">${data.name_ar}</div>
    </div>
  `;

  // ✅ تفعيل البطاقة عند الضغط
  el.addEventListener("click", () => selectElement(data, el));

  return el;
}

/* تحويل النوع الإنجليزي إلى اسم مجموعة متوافق مع CSS */
function formatGroup(type) {
  return type.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z\-]/g, "");
}





/* تعبئة الجدول الرئيسي */
function buildMainTable(){
  const root = document.getElementById("main-table");
  root.style.direction = "ltr"; // ✅ تعديل الاتجاه لحل مشكلة الانعكاس
  PERIOD_ROWS.forEach(row => {
    const full = [...row];
    while(full.length < 18) full.push("");
    full.forEach(sym => root.appendChild(createElementCell(sym)));
  });
}

/* تعبئة f-block */
function buildFBlock(){
  const lan = document.getElementById("lanth-table");
  const act = document.getElementById("act-table");

  lan.style.direction = "ltr"; // ✅ تعديل الاتجاه
  act.style.direction = "ltr"; // ✅ تعديل الاتجاه

  const leadSpacers = 3;

  for(let i=0;i<leadSpacers;i++) lan.appendChild(createElementCell(""));
  LANTHANIDES.forEach(sym => lan.appendChild(createElementCell(sym)));
  while(lan.children.length < 18) lan.appendChild(createElementCell(""));

  for(let i=0;i<leadSpacers;i++) act.appendChild(createElementCell(""));
  ACTINIDES.forEach(sym => act.appendChild(createElementCell(sym)));
  while(act.children.length < 18) act.appendChild(createElementCell(""));
}

/* تحديث التفاصيل */
let lastActive = null;
function selectElement(data, el){
  if(lastActive){ lastActive.classList.remove("active"); }
  el.classList.add("active"); lastActive = el;

  document.getElementById("d-symbol").textContent = data.sym;
  document.getElementById("d-number").textContent = data.Z;
  document.getElementById("d-mass").textContent = data.mass;
  document.getElementById("d-name").textContent = data.name_ar;
  document.getElementById("d-type").textContent = data.type_ar;
  
  // **هذه هي التعديلات الجديدة لتعبئة كل الحقول**
  document.getElementById("d-state").textContent = data.state_ar;
  document.getElementById("d-mp").textContent = data.melting_ar;
  document.getElementById("d-bp").textContent = data.boiling_ar;
  document.getElementById("d-density").textContent = data.density_ar;
  document.getElementById("d-color").textContent = data.color_ar;
  document.getElementById("d-electrons").textContent = data.electron_config_ar;
  document.getElementById("d-uses").textContent = data.uses_ar;

  const equationInput = document.getElementById('equation-input');
  insertHtmlAtCursor(equationInput, data.sym);
}
 
/* تشغيل */
buildMainTable();
buildFBlock();

const firstCell = document.querySelector('.element[data-symbol="H"]');
if (firstCell) firstCell.click();

const balanceBtn = document.getElementById("balance-btn");
const equationInput = document.getElementById("equation-input");
const resultArea = document.getElementById("balanced-equation");

if (balanceBtn) {
  balanceBtn.addEventListener('click', () => {
    const equationText = equationInput.innerText;
    const result = balanceEquation(equationText);
    resultArea.textContent = result;
    if (result.startsWith("صيغة")) alert(result);
  });
}

/* تأثير اللمس على الموبايل */
document.querySelectorAll('.element').forEach(el => {
  el.addEventListener('touchstart', () => {
    document.querySelectorAll('.element.active')
      .forEach(activeEl => activeEl.classList.remove('active'));
    el.classList.add('active');
  });
});


/* -------- جعل بطاقة التفاصيل draggable + تلوين ديناميكي -------- */
function makeDraggable(el) {
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  // بداية السحب
  el.addEventListener("mousedown", startDrag);
  el.addEventListener("touchstart", startDrag, { passive: false });

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;

    const rect = el.getBoundingClientRect();
    offsetX = (e.clientX || e.touches[0].clientX) - rect.left;
    offsetY = (e.clientY || e.touches[0].clientY) - rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", stopDrag);
  }

  // أثناء السحب
  function drag(e) {
    if (!isDragging) return;
    const x = (e.clientX || e.touches[0].clientX) - offsetX;
    const y = (e.clientY || e.touches[0].clientY) - offsetY;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.right = "auto"; // علشان ما يفضلش لازق يمين
  }

  // إنهاء السحب
  function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }
}

// فعلها على البطاقة
const detailsCard = document.querySelector(".details-card");
if (detailsCard) {
  detailsCard.style.position = "absolute"; // مهم علشان تتحرك
  detailsCard.style.top = "120px";
  detailsCard.style.left = "120px";
  makeDraggable(detailsCard);
}

/* -------- تلوين البطاقة حسب العنصر -------- */
function selectElement(data, el) {
  // تحديث البيانات داخل البطاقة
  document.getElementById("d-symbol").textContent = data.sym;
  document.getElementById("d-number").textContent = data.Z;
  document.getElementById("d-mass").textContent = data.mass;
  document.getElementById("d-name").textContent = data.name_ar;
  document.getElementById("d-type").textContent = data.type_ar;
  document.getElementById("d-state").textContent = data.state_ar;
  document.getElementById("d-mp").textContent = data.melting_ar;
  document.getElementById("d-bp").textContent = data.boiling_ar;
  document.getElementById("d-density").textContent = data.density_ar;
  document.getElementById("d-color").textContent = data.color_ar;
  document.getElementById("d-electrons").textContent = data.electron_config_ar;
  document.getElementById("d-uses").textContent = data.uses_ar;

  // تلوين البطاقة حسب لون العنصر
  const neonColor = getComputedStyle(el).getPropertyValue('--neon');
  const card = document.getElementById("details");
  card.style.borderColor = neonColor;
  card.style.boxShadow = `0 0 30px ${neonColor}, inset 0 0 12px rgba(255,255,255,0.05)`;
}
