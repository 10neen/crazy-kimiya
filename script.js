
/* ============================================================
   1. مصنع الخلايا وبناء الجدول الدوري
   ============================================================ */

// تحديد كلاس العنصر بناءً على نوعه (للتنسيق اللوني)
function getGroupClass(type_ar) {
    if (!type_ar) return "transition";
    if (type_ar.includes("لانثانيد")) return "lanthanide";
    if (type_ar.includes("أكتينيد")) return "actinide";
    if (type_ar.includes("غاز نبيل")) return "noble";
    if (type_ar.includes("هالوجين")) return "halogen";
    if (type_ar.includes("فلز قلوي أرضي")) return "alkaline";
    if (type_ar.includes("فلز قلوي")) return "alkali";
    if (type_ar.includes("شبه فلز")) return "metalloid";
    if (type_ar.includes("لافلز")) return "nonmetal";
    if (type_ar.includes("فلز انتقالي")) return "transition";
    if (type_ar.includes("فلز بعد انتقالي")) return "post-transition";
    return "transition";
}

// إنشاء خلية العنصر
function createElementCell(sym) {
    var div = document.createElement("div");

    if (!sym) {
        div.className = "element empty";
        div.style.visibility = "hidden";
        return div;
    }

    var cleanSym = sym.replace(/[0-9]/g, "");
    var data = (typeof MAP !== "undefined") ? MAP[cleanSym] : null;

    if (!data) return div;

    var gClass = getGroupClass(data.type_ar);
    div.className = "element " + gClass;
    div.dataset.symbol = cleanSym;
    div.style.borderColor = "var(--color-" + gClass + ")";
    div.style.color = "var(--color-" + gClass + ")";

    div.innerHTML =
        '<div class="element-content">' +
            '<div class="atomic-number">' + data.Z + '</div>' +
            '<div class="symbol-large">' + data.sym + '</div>' +
            '<div class="arabic-name">' + data.name_ar + '</div>' +
        '</div>';

    div.onclick = function () {
        selectElement(data, div);
    };

    return div;
}

// بناء الجدول الدوري والسلاسل السفلية
function buildCompleteSystem() {
    var main = document.getElementById("main-table");
    var lan = document.getElementById("lanth-table");
    var act = document.getElementById("act-table");

    if (main && typeof PERIOD_ROWS !== "undefined") {
        main.innerHTML = "";
        main.style.display = "grid";
        main.style.gridTemplateColumns = "repeat(18, 1fr)";
        main.style.direction = "ltr";

        var flatRows = [].concat.apply([], PERIOD_ROWS);

        flatRows.forEach(function (sym) {
            main.appendChild(createElementCell(sym));
        });
    }

    if (lan && typeof LANTHANIDES !== "undefined") {
        lan.innerHTML = "";
        for (var i = 0; i < 2; i++) {
            lan.appendChild(createElementCell(""));
        }

        LANTHANIDES.forEach(function (sym) {
            lan.appendChild(createElementCell(sym));
        });
    }

    if (act && typeof ACTINIDES !== "undefined") {
        act.innerHTML = "";
        for (var j = 0; j < 2; j++) {
            act.appendChild(createElementCell(""));
        }

        ACTINIDES.forEach(function (sym) {
            act.appendChild(createElementCell(sym));
        });
    }

    setTimeout(function () {
        var hCell = document.querySelector('.element[data-symbol="H"]');
        if (hCell) hCell.click();
    }, 150);
}

// تحديث بطاقة تفاصيل العنصر
function selectElement(data, el) {
    if (window.lastActive) {
        window.lastActive.classList.remove("active");
    }

    el.classList.add("active");
    window.lastActive = el;

    var neonColor = getComputedStyle(el).borderColor;
    var detailsCard = document.querySelector(".details-card");

    if (detailsCard) {
        detailsCard.style.borderColor = neonColor;
        detailsCard.style.boxShadow = "0 0 25px " + neonColor;
    }

    var fields = {
        "d-symbol": data.sym,
        "d-number": data.Z,
        "d-mass": data.mass,
        "d-name": data.name_ar,
        "d-type": data.type_ar,
        "d-state": data.state_ar,
        "d-mp": data.melting_ar,
        "d-bp": data.boiling_ar,
        "d-density": data.density_ar,
        "d-electrons": data.electron_config_ar,
        "d-uses": data.uses_ar
    };

    for (var id in fields) {
        var dom = document.getElementById(id);
        if (dom) {
            dom.textContent =
                (fields[id] && fields[id] !== "undefined") ?
                fields[id] : "—";
        }
    }

    var levelBadge = document.getElementById("d-level");

    if (levelBadge && data.level) {
        var levelNames = {
            1: "ابتدائي",
            2: "إعدادي",
            3: "ثانوي",
            4: "جامعي",
            5: "بحثي"
        };

        levelBadge.textContent = levelNames[data.level] || "عام";
        levelBadge.className = "level-badge level-" + data.level;
    }
}

/* ============================================================
   1.5 البحث الذكي واقتراحات المواد
   ============================================================ */

// توحيد النص لتسهيل البحث بالعربي والإنجليزي
function normalizeSearchText(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/[أإآ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/\s+/g, "");
}

// أسماء شائعة لبعض المركبات الموجودة في قاعدة التفاعلات
var CHEMICAL_ALIASES = {
    "ماء": "H2O",
    "الماء": "H2O",
    "water": "H2O",
    "ثاني اكسيد الكربون": "CO2",
    "ثاني أكسيد الكربون": "CO2",
    "carbon dioxide": "CO2",
    "نشادر": "NH3",
    "امونيا": "NH3",
    "أمونيا": "NH3",
    "ammonia": "NH3",
    "ميثان": "CH4",
    "methane": "CH4",
    "ايثانول": "C2H5OH",
    "إيثانول": "C2H5OH",
    "ethanol": "C2H5OH",
    "حمض الخليك": "CH3COOH",
    "حمض الاسيتيك": "CH3COOH",
    "acetic acid": "CH3COOH",
    "حمض الهيدروكلوريك": "HCl",
    "hydrochloric acid": "HCl",
    "حمض الكبريتيك": "H2SO4",
    "sulfuric acid": "H2SO4",
    "حمض النيتريك": "HNO3",
    "nitric acid": "HNO3",
    "هيدروكسيد الصوديوم": "NaOH",
    "sodium hydroxide": "NaOH",
    "كلوريد الصوديوم": "NaCl",
    "ملح الطعام": "NaCl",
    "sodium chloride": "NaCl",
    "كربونات الكالسيوم": "CaCO3",
    "calcium carbonate": "CaCO3",
    "بيكربونات الصوديوم": "NaHCO3",
    "sodium bicarbonate": "NaHCO3",
    "اكسيد النحاس": "CuO",
    "أكسيد النحاس": "CuO",
    "copper oxide": "CuO",
    "اكسيد الحديد": "Fe2O3",
    "أكسيد الحديد": "Fe2O3",
    "iron oxide": "Fe2O3",
    "كبريتات النحاس": "CuSO4",
    "copper sulfate": "CuSO4",
    "كلوريد الحديد": "FeCl3",
    "iron chloride": "FeCl3",
    "بوتاسيوم": "K",
    "potassium": "K",
    "صوديوم": "Na",
    "sodium": "Na",
    "حديد": "Fe",
    "iron": "Fe",
    "نحاس": "Cu",
    "copper": "Cu",
    "ماغنسيوم": "Mg",
    "مغنيسيوم": "Mg",
    "magnesium": "Mg",
    "كالسيوم": "Ca",
    "calcium": "Ca",
    "الكلور": "Cl",
    "chlorine": "Cl",
    "اكسجين": "O",
    "أكسجين": "O",
    "oxygen": "O",
    "هيدروجين": "H",
    "hydrogen": "H",
    "كربون": "C",
    "carbon": "C",
    "كبريت": "S",
    "sulfur": "S",
    "فضة": "Ag",
    "silver": "Ag",
    "زنك": "Zn",
    "خارصين": "Zn",
    "zinc": "Zn"
};

// البحث عن رمز العنصر من اسمه أو رمزه
function findElementBySearch(value) {
    var query = normalizeSearchText(value);

    if (!query || typeof ELEMENTS === "undefined") return null;

    for (var i = 0; i < ELEMENTS.length; i++) {
        var el = ELEMENTS[i];

        if (
            normalizeSearchText(el.sym) === query ||
            normalizeSearchText(el.name) === query ||
            normalizeSearchText(el.name_ar) === query
        ) {
            return el;
        }
    }

    return null;
}

// تحويل الاسم الشائع إلى الصيغة المخزنة عند توفرها



function resolveChemicalInput(value) {
    var raw = String(value || "").trim();
    if (!raw) return "";

    var normalized = normalizeSearchText(raw);

    // 1. الأسماء الشائعة
    for (var alias in CHEMICAL_ALIASES) {
        if (normalizeSearchText(alias) === normalized) {
            return CHEMICAL_ALIASES[alias];
        }
    }

    // 2. الأولوية للصيغة الكيميائية المكتوبة بحروفها الصحيحة
    // مثال: CO هو أول أكسيد الكربون، وCo هو الكوبالت.
    var knownCompounds = getUniqueCompounds();

    for (var i = 0; i < knownCompounds.length; i++) {
        if (raw.replace(/\s+/g, "") === knownCompounds[i]) {
            return knownCompounds[i];
        }
    }

    // 3. البحث عن العنصر بعد التحقق من الصيغ الدقيقة
    var element = findElementBySearch(raw);
    if (element) return element.sym;

    // 4. تصحيح حالة الأحرف للصيغ غير الملتبسة
    var matches = knownCompounds.filter(function(formula) {
        return normalizeSearchText(formula) === normalized;
    });

    if (matches.length === 1) {
        return matches[0];
    }

    // في حالة الالتباس، لا نخمن الصيغة
    return raw.replace(/\s+/g, "");
}






// بناء قائمة المواد من العناصر وقواعد التفاعلات
function getSearchableChemicals() {
    var items = [];
    var seen = {};

    function addItem(value, label, kind) {
        if (!value) return;

        var key = normalizeSearchText(value);
        if (!key || seen[key]) return;

        seen[key] = true;

        items.push({
            value: value,
            label: label || value,
            kind: kind || "compound"
        });
    }

    if (typeof ELEMENTS !== "undefined") {
        ELEMENTS.forEach(function (el) {
            addItem(el.sym, el.sym + " — " + el.name_ar, "element");
            addItem(el.name, el.name + " — " + el.sym, "element-name");
            addItem(el.name_ar, el.name_ar + " — " + el.sym, "element-name");
        });
    }

    getUniqueCompounds().forEach(function (formula) {
        addItem(formula, formula, "compound");
    });

    for (var alias in CHEMICAL_ALIASES) {
        addItem(
            alias,
            alias + " — " + CHEMICAL_ALIASES[alias],
            "alias"
        );
    }

    return items;
}

// تعبئة datalist المستخدمة في حقول البحث والمعمل
function populateDatalist() {
    var datalist = document.getElementById("elements-list");
    if (!datalist) return;

    datalist.innerHTML = "";

    var items = getSearchableChemicals();

    items.forEach(function (item) {
        var option = document.createElement("option");
        option.value = item.value;
        option.label = item.label;
        datalist.appendChild(option);
    });

    console.log("تم تجهيز اقتراحات المواد:", items.length);
}

// تفعيل البحث في الجدول الدوري بالرمز أو الاسم العربي أو الإنجليزي
function setupElementSearch() {
    var searchInput = document.getElementById("element-search");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        var query = normalizeSearchText(searchInput.value);
        var elements = document.querySelectorAll(".element:not(.empty)");
        var firstMatch = null;

        elements.forEach(function (cell) {
            var symbol = normalizeSearchText(cell.dataset.symbol || "");
            var nameNode = cell.querySelector(".arabic-name");
            var arabicName = normalizeSearchText(
                nameNode ? nameNode.textContent : ""
            );

            var data = (typeof MAP !== "undefined") ?
                MAP[cell.dataset.symbol] : null;

            var englishName = normalizeSearchText(data ? data.name : "");
            var matches = !query ||
                symbol.indexOf(query) !== -1 ||
                arabicName.indexOf(query) !== -1 ||
                englishName.indexOf(query) !== -1;

            if (matches) {
                cell.style.opacity = "1";
                cell.style.pointerEvents = "auto";
                cell.style.display = "flex";

                if (!firstMatch && query) firstMatch = cell;
            } else {
                cell.style.opacity = "0.2";
                cell.style.pointerEvents = "none";
            }
        });

        // لا نختار عنصرًا تلقائيًا؛ نترك القرار للطالب
        if (query && firstMatch && query.length > 1) {
            // تمييز النتائج فقط دون فتح بطاقة العنصر
        }
    });
}

// تحويل الإدخال إلى الصيغة المعروفة قبل تشغيل التجربة
function setupManualInputs() {
    var slot1 = document.getElementById("slot-1");
    var slot2 = document.getElementById("slot-2");

    function prepareInput(input) {
        if (!input || input.dataset.smartInputReady === "true") return;

        input.setAttribute("list", "elements-list");
        input.setAttribute("autocomplete", "off");
        input.dataset.smartInputReady = "true";

        input.addEventListener("change", function () {
            var value = this.value.trim();
            if (!value) return;

            var resolved = resolveChemicalInput(value);
            this.value = resolved;
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();

                var resolved = resolveChemicalInput(this.value);
                this.value = resolved;

                var otherSlot = this.id === "slot-1" ?
                    document.getElementById("slot-2") :
                    document.getElementById("slot-1");

                if (otherSlot && !otherSlot.value.trim()) {
                    otherSlot.focus();
                } else {
                    processReaction();
                }
            }
        });
    }

    prepareInput(slot1);
    prepareInput(slot2);
}



/* ============================================================
   2. منطق المعمل الكيميائي ومحرك النتائج
   ============================================================ */

var GASES = ["H", "O", "N", "Cl", "Br", "F", "I"];

function getMolecularFormula(sym) {
    if (!sym) return "";

    return GASES.indexOf(sym) !== -1 ? sym + "2" : sym;
}

function processReaction() {
    runLogic("react");
}

function processHeat() {
    runLogic("heat");
}

function processRedox() {
    runLogic("redox");
}

/*
 * توحيد المدخلات بدون تحويل الصيغة كلها إلى حروف صغيرة.
 * مهم للحفاظ على صيغ مثل:
 * NaOH - FeCl3 - H2SO4 - CH3COOH
 */
 
 
 
function normalizeChemicalInput(value) {
    if (!value) return "";

    // توحيد الأرقام السفلية (مثل Cu(OH)₂) إلى أرقام عادية (Cu(OH)2)
    // حتى تتطابق الصيغة مع المفاتيح المخزنة في CHEMISTRY_DATABASE.
    var cleaned = String(value)
        .trim()
        .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, function(digit) {
            return "₀₁₂₃₄₅₆₇₈₉".indexOf(digit);
        })
        .replace(/\s+/g, "");

    if (typeof resolveChemicalInput === "function") {
        var resolved = resolveChemicalInput(cleaned);

        if (resolved) {
            if (typeof resolved === "string") {
                return resolved;
            }

            if (resolved.symbol) return resolved.symbol;
            if (resolved.formula) return resolved.formula;
            if (resolved.name) return resolved.name;
        }
    }

    if (typeof MAP !== "undefined") {
        var mapKeys = Object.keys(MAP);

        for (var i = 0; i < mapKeys.length; i++) {
            if (mapKeys[i].toLowerCase() === cleaned.toLowerCase()) {
                return mapKeys[i];
            }
        }
    }

    return cleaned;
}



/*
 * البحث عن التفاعل المسجل في قاعدة البيانات.
 * يراعي ترتيب المواد، ويبحث داخل القسم المناسب للزر فقط.
 */
function findReactionInDatabase(query1, query2, formula1, formula2, mode) {
    if (typeof CHEMISTRY_DATABASE === "undefined") {
        return null;
    }

    var db = CHEMISTRY_DATABASE;

    function normalizeKey(key) {
        return String(key || "")
            .replace(/\s+/g, "")
            .replace(/→|⟶|=/g, "")
            .trim();
    }

    function findInLibrary(library, keys) {
        if (!library) return null;

        // البحث المباشر أولًا
        for (var i = 0; i < keys.length; i++) {
            var key = normalizeKey(keys[i]);
            if (key && library[key]) {
                return library[key];
            }
        }

        // البحث بعد توحيد ترتيب المواد
        var normalizedQueries = keys.map(normalizeKey).filter(Boolean);

        var entries = Object.keys(library);

        for (var j = 0; j < entries.length; j++) {
            var dbKey = entries[j];
            var parts = dbKey.split("+").map(normalizeKey);

            if (parts.length < 2) continue;

            var sortedDbKey = parts.slice().sort().join("+");

            for (var k = 0; k < normalizedQueries.length; k++) {
                var queryParts = normalizedQueries[k]
                    .split("+")
                    .map(normalizeKey);

                if (
                    queryParts.length === parts.length &&
                    queryParts.slice().sort().join("+") === sortedDbKey
                ) {
                    return library[dbKey];
                }
            }
        }

        return null;
    }

    var keys = [
        query1,
        query2,
        formula1 + "+" + formula2,
        formula2 + "+" + formula1,
        formula1,
        formula2
    ];

    var libraries = [];

    if (mode === "react") {
        libraries = [
            db.specialReactions,
            db.elementReactions,
            db.organicReactions,
            db.ironReactions,
            db.doubleDisplacement
        ];
    } else if (mode === "heat") {
        libraries = [db.heatLibrary];
    } else if (mode === "redox") {
        libraries = [db.redoxLibrary];
    } else {
        return null;
    }

    for (var i = 0; i < libraries.length; i++) {
        var result = findInLibrary(libraries[i], keys);

        if (result) {
            return result;
        }
    }

    return null;
}




function runLogic(mode) {
    var input1 = document.getElementById("slot-1");
    var input2 = document.getElementById("slot-2");
    var report = document.getElementById("lab-report");

    if (!input1 || !input2 || !report) return;

    var raw1 = input1.value.trim();
    var raw2 = input2.value.trim();

    var s1 = normalizeChemicalInput(raw1);
    var s2 = normalizeChemicalInput(raw2);

    if (s1) input1.value = s1;
    if (s2) input2.value = s2;

    if (!s1 && mode !== "heat") {
        report.innerHTML =
            '<div style="background:#fff3f3;color:#c0392b;padding:20px;' +
            'border-radius:12px;border:2px dashed #c0392b;text-align:right;">' +
            '⚠️ يرجى اختيار مادة أولى على الأقل.</div>';

        return;
    }

    if (mode !== "heat" && !s2) {
        report.innerHTML =
            '<div style="background:#fff8e6;color:#9a6700;padding:20px;' +
            'border-radius:12px;border:2px dashed #e0a800;text-align:right;">' +
            '🧪 اختَر المادة الثانية لإجراء التجربة.</div>';

        return;
    }

    var formula1 = getMolecularFormula(s1);
    var formula2 = getMolecularFormula(s2);

    var queryItems = [formula1, formula2].filter(function(item) {
        return item !== "";
    });

    queryItems.sort();

    var query1 = queryItems.join("+");

    var query2 = queryItems.slice().reverse().join("+");

    var result = findReactionInDatabase(
        query1,
        query2,
        formula1,
        formula2,
        mode
    );

    renderLabResult(result, mode, report, s1, s2);
}

/* ============================================================
   3. عرض نتيجة المعمل
   ============================================================ */

function renderLabResult(result, type, container, s1, s2) {
    if (!container) return;

    if (!result) {
        if (typeof playLabSound === "function") {
            playLabSound("خطأ");
        }

        var modeNames = {
            react: "التفاعل الكيميائي",
            heat: "التسخين",
            redox: "الأكسدة والاختزال"
        };

        container.innerHTML =
            '<div style="padding:22px;background:#fff8e6;color:#5c4500;' +
            'border-radius:15px;text-align:right;border-right:8px solid #e0a800;">' +
                '<h3 style="margin-top:0;">🔎 لم يتم العثور على نتيجة مؤكدة</h3>' +
                '<p style="line-height:1.8;">' +
                    'لا توجد نتيجة مسجلة لهذا الاختيار في قاعدة بيانات المعمل الحالية ' +
                    'ضمن قسم ' + (modeNames[type] || "التجربة") + '.' +
                '</p>' +
                '<p style="line-height:1.8;">' +
                    'هذا لا يعني بالضرورة أن التفاعل مستحيل؛ قد يحتاج إلى شروط خاصة ' +
                    'أو قد لا تكون بياناته مضافة بعد. لن نعرض ناتجًا تخمينيًا على أنه حقيقة.' +
                '</p>' +
                '<button onclick="clearLab()" style="background:#8a6d00;color:white;' +
                'border:none;padding:10px 18px;border-radius:25px;cursor:pointer;">' +
                    'مسح المعمل 🧹' +
                '</button>' +
            '</div>';

        return;
    }

    if (typeof playLabSound === "function") {
        playLabSound(result.note || "");
    }

    var note = result.note || "لا توجد ملاحظة إضافية.";

    if (
        note.includes("فرقعة") ||
        note.includes("انفجار") ||
        note.includes("بعنف")
    ) {
        var labWindow =
            document.querySelector(".molar-calculator") || container;

        labWindow.style.animation = "shake 0.5s ease-in-out";

        setTimeout(function() {
            labWindow.style.animation = "";
        }, 500);
    }

    var themeColor =
        type === "heat" ? "#e67e22" :
        type === "redox" ? "#9b59b6" :
        "#27ae60";

    var bgColor = "#ffffff";
    var textColor = "#333333";

    if (note.includes("بني محمر") || note.includes("بني")) {
        bgColor = "#fdebd0";
    }

    if (note.includes("أزرق")) bgColor = "#ebf5fb";
    if (note.includes("أخضر")) bgColor = "#e9f7ef";
    if (note.includes("أصفر")) bgColor = "#fef9e7";

    if (note.includes("أسود")) {
        bgColor = "#2c3e50";
        textColor = "#ffffff";
    }

    if (note.includes("بنفسجي") || note.includes("بنفسج")) {
        bgColor = "#f4ecf7";
    }

    var levelBadge = "";

    if (result.level) {
        var levelNames = {
            1: "ابتدائي",
            2: "إعدادي",
            3: "ثانوي",
            4: "جامعي",
            5: "بحثي"
        };

        levelBadge =
            '<span style="background:' + themeColor +
            '20;color:' + themeColor +
            ';padding:3px 12px;border-radius:20px;font-size:0.8rem;">' +
            '📚 ' + (levelNames[result.level] || "مستوى تعليمي") +
            '</span>';
    }

    var fullEquation = result.full || (s1 + " + " + s2);
    var product = result.result || "غير محدد";

    container.innerHTML =
        '<div class="res-box ' + type + '" style="' +
            'padding:25px;background:' + bgColor +
            ';color:' + textColor +
            ';border-radius:15px;text-align:right;' +
            'border-right:10px solid ' + themeColor +
            ';box-shadow:0 10px 30px rgba(0,0,0,0.15);">' +

            '<div style="display:flex;justify-content:space-between;' +
            'align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:15px;">' +

                '<div style="background:' + themeColor +
                ';color:white;padding:5px 15px;border-radius:20px;' +
                'display:inline-block;font-weight:bold;">' +
                    '✨ نتيجة المختبر' +
                '</div>' +

                levelBadge +
            '</div>' +

            '<h2 style="font-size:2rem;margin:10px 0;' +
            'font-family:Consolas,monospace;direction:ltr;' +
            'text-align:center;overflow-wrap:anywhere;">' +
                fullEquation + ' → ' + product +
            '</h2>' +

            '<div style="height:2px;background:rgba(0,0,0,0.08);' +
            'margin:15px 0;"></div>' +

            '<p style="font-size:1.1rem;line-height:1.8;">' +
                '<strong>📝 الملاحظة:</strong> ' + note +
            '</p>' +

            '<div style="margin-top:20px;text-align:left;">' +
                '<button onclick="shareResult(\'' +
                encodeURIComponent(JSON.stringify(result)) +
                '\')" style="background:' + themeColor +
                ';color:white;border:none;padding:10px 20px;' +
                'border-radius:30px;cursor:pointer;font-weight:bold;">' +
                    '📱 مشاركة النتيجة' +
                '</button>' +
            '</div>' +

        '</div>';

    container.style.animation = "none";

    setTimeout(function() {
        container.style.animation = "fadeInUp 0.4s ease forwards";
    }, 10);
}

/* ============================================================
   4. حاسبة الكتلة المولية
   ============================================================ */

function showMolarResult() {
    var inputElement = document.getElementById("formula-input");
    var resultDiv = document.getElementById("molar-result");

    if (!inputElement || !resultDiv) return;

    var input = inputElement.value.trim();

    if (!input) {
        resultDiv.innerHTML =
            '<span style="color:#e0a800;">⚠️ اكتب صيغة كيميائية أولًا.</span>';

        return;
    }

    var corrected = input.replace(/\s+/g, "");

    var mass = calculateMolarMass(corrected);

    if (mass > 0) {
        resultDiv.innerHTML =
            '<div style="background:rgba(0,212,255,0.05);padding:15px;' +
            'border-radius:12px;border:1px solid rgba(0,212,255,0.3);color:#fff;">' +

                '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +

                    '<span style="background:#00d4ff;color:#000;width:30px;height:30px;' +
                    'border-radius:50%;display:flex;align-items:center;' +
                    'justify-content:center;">🧪</span>' +

                    '<div style="flex:1;">' +
                        '<span style="color:#888;">الكتلة المولية لـ </span>' +
                        '<strong style="color:#00d4ff;font-size:1.3rem;' +
                        'direction:ltr;display:inline-block;">' +
                            corrected +
                        '</strong>' +
                    '</div>' +

                    '<span style="font-size:1.7rem;color:#00d4ff;font-weight:bold;' +
                    'direction:ltr;">' + mass + '</span>' +

                    '<span style="color:#888;">جم/مول</span>' +

                '</div>' +

                '<div style="margin-top:10px;font-size:0.85rem;color:#aaa;' +
                'border-top:1px dashed #444;padding-top:8px;">' +
                    '✅ ناتج حساب الكتلة المولية للصيغة المدخلة' +
                '</div>' +

            '</div>';
    } else {
        resultDiv.innerHTML =
            '<span style="color:#ff6666;">' +
                '⚠️ لم أستطع حساب الصيغة. راجع الرموز والأرقام والأقواس. ' +
                'مثال: H2SO4 أو CH3COOH أو Ca(OH)2.' +
            '</span>';
    }
}

/*
 * حساب الكتلة المولية من الكتل الذرية الموجودة في MAP.
 * يدعم الصيغ التي تحتوي على أقواس مثل Ca(OH)2.
 */
function calculateMolarMass(formula) {
    if (!formula || typeof MAP === "undefined") return 0;

    var processed = String(formula).replace(/\s+/g, "");

    if (!/^[A-Za-z0-9()]+$/.test(processed)) {
        return 0;
    }

    /*
     * تحويل المجموعات بين الأقواس إلى عناصر مضروبة في العدد الخارجي.
     * نكرر العملية لدعم الأقواس المتداخلة البسيطة.
     */
    var previous;

    do {
        previous = processed;

        processed = processed.replace(
            /\(([^()]+)\)(\d*)/g,
            function(match, inner, multiplierText) {
                var multiplier = parseInt(multiplierText, 10) || 1;

                var expanded = inner.replace(
                    /([A-Z][a-z]?)(\d*)/g,
                    function(part, symbol, countText) {
                        var count = parseInt(countText, 10) || 1;
                        var total = count * multiplier;

                        return symbol + (total > 1 ? total : "");
                    }
                );

                return expanded;
            }
        );
    } while (processed !== previous && processed.indexOf("(") !== -1);

    if (processed.indexOf("(") !== -1 || processed.indexOf(")") !== -1) {
        return 0;
    }

    var regex = /([A-Z][a-z]?)(\d*)/g;
    var totalMass = 0;
    var foundAny = false;
    var match;
    var lastIndex = 0;

    while ((match = regex.exec(processed)) !== null) {
        if (match.index !== lastIndex) {
            return 0;
        }

        var symbol = match[1];
        var count = parseInt(match[2], 10) || 1;

        if (!MAP[symbol] || MAP[symbol].mass === undefined) {
            return 0;
        }

        var atomicMass = parseFloat(MAP[symbol].mass);

        if (!isFinite(atomicMass)) {
            return 0;
        }

        totalMass += atomicMass * count;
        foundAny = true;
        lastIndex = regex.lastIndex;
    }

    if (!foundAny || lastIndex !== processed.length) {
        return 0;
    }

    return Number(totalMass.toFixed(3));
}

/* ============================================================
   5. استخراج المركبات الموجودة في قاعدة التفاعلات
   ============================================================ */

function getUniqueCompounds() {
    var allFound = {};

    if (typeof CHEMISTRY_DATABASE === "undefined") {
        return [];
    }

    var sections = [
        CHEMISTRY_DATABASE.specialReactions,
        CHEMISTRY_DATABASE.heatLibrary,
        CHEMISTRY_DATABASE.redoxLibrary,
        CHEMISTRY_DATABASE.elementReactions,
        CHEMISTRY_DATABASE.organicReactions,
        CHEMISTRY_DATABASE.ironReactions,
        CHEMISTRY_DATABASE.doubleDisplacement
    ];

    sections.forEach(function(library) {
        if (!library) return;

        Object.keys(library).forEach(function(fullKey) {
            fullKey.split("+").forEach(function(item) {
                var trimmed = item.trim();

                if (trimmed && trimmed.indexOf(" ") === -1) {
                    allFound[trimmed] = true;
                }
            });
        });
    });

    return Object.keys(allFound).sort();
}

/* ============================================================
   6. مسح المعمل
   ============================================================ */

function clearLab() {
    var slot1 = document.getElementById("slot-1");
    var slot2 = document.getElementById("slot-2");
    var report = document.getElementById("lab-report");
    var molarInput = document.getElementById("formula-input");
    var molarResult = document.getElementById("molar-result");

    if (slot1) slot1.value = "";
    if (slot2) slot2.value = "";

    if (report) {
        report.innerHTML =
            '<div style="color:#888;border:2px dashed #444;padding:20px;' +
            'border-radius:10px;text-align:center;">' +
                '🧪 المعمل جاهز.. اختر المواد وابدأ التفاعل' +
            '</div>';
    }

    if (molarInput) molarInput.value = "";
    if (molarResult) molarResult.innerHTML = "";

    window.activeSlotId = "slot-1";

    updateActiveSlotHighlight();
}

/* ============================================================
   7. المركبات والرف السريع
   ============================================================ */

var QUICK_COMPOUNDS = [
    "H2O", "CO2", "NH3", "CH4", "C2H4", "C2H2", "C2H5OH", "CH3COOH",
    "Fe2O3", "Fe3O4", "FeO", "FeSO4", "FeCl3", "Fe(OH)3", "FeC2O4",
    "CuO", "CuSO4", "NaOH", "HCl", "H2SO4", "HNO3", "AgNO3", "BaCl2",
    "Na2CO3", "NaHCO3", "KI", "KMnO4", "Pb(NO3)2", "CaCO3", "NH4Cl"
];

function initializeQuickShelf() {
    var shelf = document.getElementById("quick-shelf");

    if (!shelf) return;

    var allItems = {};

    QUICK_COMPOUNDS.forEach(function(compound) {
        allItems[compound] = true;
    });

    getUniqueCompounds().forEach(function(compound) {
        allItems[compound] = true;
    });

    shelf.innerHTML = "";

    Object.keys(allItems).sort().forEach(function(compound) {
        var button = document.createElement("button");

        button.textContent = compound;
        button.dataset.compound = compound;

        button.style.cssText =
            "padding:8px 14px;margin:5px;cursor:pointer;" +
            "background:#1a1a1a;color:#00d4ff;border:1px solid #00d4ff;" +
            "border-radius:6px;font-weight:bold;transition:0.3s;" +
            "font-family:'Segoe UI',sans-serif;";

        button.onmouseover = function() {
            this.style.background = "#00d4ff";
            this.style.color = "#000";
            this.style.boxShadow = "0 0 10px #00d4ff";
        };

        button.onmouseout = function() {
            this.style.background = "#1a1a1a";
            this.style.color = "#00d4ff";
            this.style.boxShadow = "none";
        };

        button.onclick = function(event) {
            event.preventDefault();
            fillInput(this.dataset.compound);
        };

        shelf.appendChild(button);
    });
}

/*
 * يملأ الحاسبة والفتحة النشطة في المعمل.
 */
function fillInput(value) {
    var molarInput = document.getElementById("formula-input");

    if (molarInput) {
        molarInput.value = value;

        if (typeof showMolarResult === "function") {
            showMolarResult();
        }
    }

    if (!window.activeSlotId) {
        window.activeSlotId = "slot-1";
    }

    var targetSlot = document.getElementById(window.activeSlotId);

    if (!targetSlot) return;

    targetSlot.value = value;

    var otherSlotId =
        window.activeSlotId === "slot-1" ? "slot-2" : "slot-1";

    var otherSlot = document.getElementById(otherSlotId);

    /*
     * لا نشغّل التفاعل قبل وجود المادتين.
     */
    if (
        otherSlot &&
        targetSlot.value.trim() &&
        otherSlot.value.trim()
    ) {
        processReaction();
    }

    window.activeSlotId = otherSlotId;

    updateActiveSlotHighlight();
}

/* ============================================================
   8. البحث داخل الرف السريع
   ============================================================ */

function filterShelfOnly(searchInput) {
    if (!searchInput) return;

    var query = searchInput.value.trim().toLowerCase();
    var buttons = document.querySelectorAll("#quick-shelf button");
    var resultDiv = document.getElementById("molar-result");
    var molarInput = document.getElementById("formula-input");

    buttons.forEach(function(button) {
        var buttonText = (
            button.dataset.compound ||
            button.textContent ||
            ""
        ).toLowerCase();

        button.style.display =
            buttonText.indexOf(query) !== -1 ? "inline-block" : "none";
    });

    if (!query) {
        if (resultDiv) resultDiv.innerHTML = "";
        return;
    }

    /*
     * جرّب حساب الكتلة المولية عند إدخال صيغة فعلية،
     * لكن لا تعرض نتيجة إذا كانت الصيغة غير صالحة.
     */
    var mass = calculateMolarMass(searchInput.value.trim());

    if (mass > 0) {
        if (molarInput) {
            molarInput.value = searchInput.value.trim();
        }

        showMolarResult();
    } else if (resultDiv) {
        resultDiv.innerHTML = "";
    }
}

/* ============================================================
   9. تمييز فتحة المعمل النشطة
   ============================================================ */

function updateActiveSlotHighlight() {
    var slot1 = document.getElementById("slot-1");
    var slot2 = document.getElementById("slot-2");

    if (slot1) {
        slot1.style.borderColor =
            window.activeSlotId === "slot-1" ? "#00d4ff" : "#333";
    }

    if (slot2) {
        slot2.style.borderColor =
            window.activeSlotId === "slot-2" ? "#00d4ff" : "#333";
    }
}

/* ============================================================
   10. مؤثرات الصوت
   ============================================================ */

function playLabSound(note) {
    if (typeof Audio === "undefined") return;

    note = note || "";

    var audio = new Audio();

    if (
        note.includes("غاز") ||
        note.includes("فوران") ||
        note.includes("CO2")
    ) {
        audio.src = "sounds/bubble.mp3";
    } else if (
        note.includes("فرقعة") ||
        note.includes("انفجار") ||
        note.includes("بعنف")
    ) {
        audio.src = "sounds/pop.mp3";
    } else if (note.includes("خطأ")) {
        audio.src = "sounds/error.mp3";
    } else {
        audio.src = "sounds/success.mp3";
    }

    audio.volume = 0.3;

    var playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function() {
            console.log("🔇 تشغيل الصوت يحتاج إلى تفاعل من المستخدم.");
        });
    }
}

/* ============================================================
   11. مشاركة نتيجة التفاعل
   ============================================================ */

function shareResult(resultJSON) {
    try {
        var result = JSON.parse(decodeURIComponent(resultJSON));

        var message =
            "🧪 معمل الكيمياء الذكي 🧪\n\n" +
            "نتيجة التجربة:\n" +
            result.full + " → " + result.result + "\n\n" +
            "📝 الملاحظة: " + result.note + "\n\n" +
            "جرّب معملك الخاص:\n" +
            window.location.href;

        var whatsappURL =
            "https://wa.me/?text=" + encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    } catch (error) {
        console.log("تعذرت مشاركة النتيجة.", error);
    }
}

/* ============================================================
   12. تشغيل الموقع وربط الأزرار
   ============================================================ */

var activeSlotId = "slot-1";
window.activeSlotId = activeSlotId;

document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 تشغيل معمل الكيمياء الذكي...");

    if (typeof buildCompleteSystem === "function") {
        buildCompleteSystem();
    }

    /*
     * تفعيل البحث والاقتراحات بعد تحميل الصفحة.
     */
    populateDatalist();
    setupElementSearch();
    setupManualInputs();

    /*
     * تجهيز الرف السريع.
     */
    initializeQuickShelf();

    /*
     * إصلاح اسم متغير البحث:
     * كان الكود القديم يعرّف searchInput ثم يستخدم varInput.
     */
    var searchInput = document.getElementById("shelf-search");

    if (searchInput) {
        searchInput.addEventListener("input", function() {
            filterShelfOnly(this);
        });
    }

    updateActiveSlotHighlight();

    /*
     * ربط أزرار المعمل.
     */
    var btnReact =
        document.getElementById("react-btn") ||
        document.querySelector(".btn-lab.react");

    var btnHeat =
        document.getElementById("heat-btn") ||
        document.querySelector(".btn-lab.heat");

    var btnRedox =
        document.getElementById("redox-btn") ||
        document.querySelector(".btn-lab.redox");

    var btnClear =
        document.getElementById("clear-btn") ||
        document.querySelector(".btn-lab.clear");

    if (btnReact) btnReact.onclick = processReaction;
    if (btnHeat) btnHeat.onclick = processHeat;
    if (btnRedox) btnRedox.onclick = processRedox;
    if (btnClear) btnClear.onclick = clearLab;

    /*
     * حاسبة الكتلة المولية.
     */
    var formulaInput = document.getElementById("formula-input");

    if (formulaInput) {
        formulaInput.addEventListener("input", function() {
            showMolarResult();
        });
    }

    var molarBtn = document.getElementById("molar-btn");

    if (molarBtn) {
        molarBtn.onclick = showMolarResult;
    }

    /*
     * رسالة البداية.
     */
    var report = document.getElementById("lab-report");

    if (report && report.innerHTML.trim() === "") {
        report.innerHTML =
            '<div style="color:#888;border:2px dashed #444;padding:20px;' +
            'border-radius:10px;text-align:center;">' +
                '🧪 مرحبًا بك في معمل الكيمياء الذكي' +
                '<br>اختر المواد من القائمة أو الرف السريع وابدأ التجربة' +
            '</div>';
    }

    console.log("✅ تم تشغيل أنظمة المعمل.");
});

/* ============================================================
   13. إتاحة الوظائف للأزرار الموجودة في HTML
   ============================================================ */

window.selectElement = selectElement;
window.processReaction = processReaction;
window.processHeat = processHeat;
window.processRedox = processRedox;
window.clearLab = clearLab;
window.showMolarResult = showMolarResult;
window.calculateMolarMass = calculateMolarMass;
window.fillInput = fillInput;
window.filterShelfOnly = filterShelfOnly;
window.shareResult = shareResult;
window.updateActiveSlotHighlight = updateActiveSlotHighlight;
window.activeSlotId = activeSlotId;




/* ============================================================
   FIX: إظهار بطاقة تفاصيل العنصر بعد الضغط عليه
   ============================================================ */

// الاحتفاظ بدالة عرض البيانات الأصلية دون فقد وظائفها.
var originalSelectElement = selectElement;

selectElement = function(data, el) {
    if (!data) return;

    // تشغيل الدالة الأصلية لتعبئة بيانات البطاقة.
    if (typeof originalSelectElement === "function") {
        originalSelectElement(data, el);
    }

    // إظهار البطاقة بعد تعبئة البيانات.
    var wrapper = document.getElementById("details-wrapper");

    if (wrapper) {
        wrapper.hidden = false;
        wrapper.style.display = "";
        wrapper.style.visibility = "visible";
        wrapper.style.opacity = "1";
    }

    // إظهار البطاقة الداخلية أيضًا إن كانت مخفية.
    var card = document.getElementById("details");

    if (card) {
        card.hidden = false;
        card.style.visibility = "visible";
        card.style.opacity = "1";
    }
};

// تحديث المرجع الذي تستخدمه خلايا الجدول.
window.selectElement = selectElement;

// إغلاق البطاقة دون التأثير على بيانات الجدول.
window.closeElementDetails = function() {
    var wrapper = document.getElementById("details-wrapper");

    if (wrapper) {
        wrapper.hidden = true;
        wrapper.style.display = "none";
    }

    document.querySelectorAll(".element.active").forEach(function(el) {
        el.classList.remove("active");
    });

    window.lastActive = null;
};

var closeDetailsButton = document.getElementById("close-details");

if (closeDetailsButton) {
    closeDetailsButton.onclick = function(event) {
        event.preventDefault();
        window.closeElementDetails();
    };
}

