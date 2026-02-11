

/* ============================================================
   1. مصنع الخلايا وبناء الجدول الدوري (Logic من كودك الأصلي)
   ============================================================ */

function getGroupClass(type_ar) {
    if (!type_ar) return "transition";
    if (type_ar.includes("لانتانيد")) return "lanthanide"; 
    if (type_ar.includes("أكتينيد")) return "actinide";    
    if (type_ar.includes("غاز خامل") || type_ar.includes("نبيل")) return "noble";      
    if (type_ar.includes("هالوجين") || type_ar.includes("شبه فلز") || type_ar.includes("لا فلز")) return "yellow-group"; 
    return "transition"; 
}

function createElementCell(sym) {
    var div = document.createElement("div");
    if (!sym) {
        div.className = "element empty";
        div.style.visibility = "hidden";
        return div;
    }

    // القراءة من MAP (الموجودة في database.js)
    var data = (typeof MAP !== 'undefined') ? MAP[sym] : null;
    if (!data) return div;

    var gClass = getGroupClass(data.type_ar);
    div.className = "element " + gClass;
    div.dataset.symbol = sym;
    
    div.style.borderColor = "var(--color-" + gClass + ")";
    div.style.color = "var(--color-" + gClass + ")";

    div.innerHTML = 
        '<div class="element-content">' +
            '<div class="atomic-number">' + data.Z + '</div>' +
            '<div class="symbol-large">' + data.sym + '</div>' +
            '<div class="arabic-name">' + data.name_ar + '</div>' +
        '</div>';
    
    div.onclick = function() { selectElement(data, div); };
    return div;
}

function buildCompleteSystem() {
    var main = document.getElementById("main-table");
    var lan = document.getElementById("lanth-table");
    var act = document.getElementById("act-table");

    if (main && typeof PERIOD_ROWS !== 'undefined') {
        main.innerHTML = "";
        main.style.display = "grid";
        main.style.gridTemplateColumns = "repeat(18, 1fr)";
        main.style.direction = "ltr"; 
        
        // استخدام flat يدوي لضمان العمل على المتصفحات القديمة
        var flatRows = [].concat.apply([], PERIOD_ROWS);
        flatRows.forEach(function(sym) { main.appendChild(createElementCell(sym)); });
    }

    // بناء سلاسل اللانثانيدات والأكتينيدات
    if (lan && typeof LANTHANIDES !== 'undefined') {
        lan.innerHTML = "";
        for(var i=0; i<2; i++) lan.appendChild(createElementCell("")); 
        LANTHANIDES.forEach(function(sym) { lan.appendChild(createElementCell(sym)); });
    }

    if (act && typeof ACTINIDES !== 'undefined') {
        act.innerHTML = "";
        for(var i=0; i<2; i++) act.appendChild(createElementCell(""));
        ACTINIDES.forEach(function(sym) { act.appendChild(createElementCell(sym)); });
    }

    // اختيار الهيدروجين تلقائياً بعد التحميل
    setTimeout(function() {
        var hCell = document.querySelector('.element[data-symbol="H"]');
        if (hCell) hCell.click();
    }, 100);
}

function selectElement(data, el) {
    if (window.lastActive) window.lastActive.classList.remove("active");
    el.classList.add("active");
    window.lastActive = el;

    var neonColor = getComputedStyle(el).borderColor;
    var detailsCard = document.querySelector(".details-card");
    
    if (detailsCard) {
        detailsCard.style.borderColor = neonColor;
        detailsCard.style.boxShadow = "0 0 25px " + neonColor;
    }

    var fields = {
        'd-symbol': data.sym, 'd-number': data.Z, 'd-mass': data.mass,
        'd-name': data.name_ar, 'd-type': data.type_ar, 'd-state': data.state_ar,
        'd-mp': data.melting_ar, 'd-bp': data.boiling_ar, 'd-density': data.density_ar,
        'd-electrons': data.electron_config_ar, 'd-uses': data.uses_ar
    };

    for (var id in fields) {
        var dom = document.getElementById(id);
        if (dom) dom.textContent = (fields[id] && fields[id] !== "undefined") ? fields[id] : "—";
    }
}

/* ============================================================
   2. منطق المعمل الكيميائي (الربط مع CHEMISTRY_DATABASE)
   ============================================================ */

var GASES = ["H", "O", "N", "Cl", "Br"];

function getMolecularFormula(sym) {
    return GASES.indexOf(sym) !== -1 ? sym + "2" : sym;
}

function processReaction() { runLogic('react'); }
function processHeat() { runLogic('heat'); }
function processRedox() { runLogic('redox'); }

function runLogic(mode) {
    var s1 = document.getElementById('slot-1').value;
    var s2 = document.getElementById('slot-2').value;
    var report = document.getElementById('lab-report');

    if (!s1 && mode !== 'heat') return;

    var res = null;
    var r1 = getMolecularFormula(s1);
    var r2 = getMolecularFormula(s2);
    var query = [r1, r2].sort().filter(function(x) { return x; }).join('+');

    // التأكد من وجود قاعدة البيانات قبل البحث
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        if (mode === 'react') res = CHEMISTRY_DATABASE.specialReactions[query];
        if (mode === 'heat') res = CHEMISTRY_DATABASE.heatLibrary[s1] || CHEMISTRY_DATABASE.heatLibrary[s2];
        if (mode === 'redox') res = CHEMISTRY_DATABASE.redoxLibrary[query] || CHEMISTRY_DATABASE.redoxLibrary[[r2, r1].sort().join('+')];
    }

    renderLabResult(res, mode, report);
}




// 1. وظيفة عرض نتائج المعمل (التفاعلات)


function renderLabResult(res, type, container) {
    if (res) {
        // تحديد لون السمة بناءً على نوع العملية
        var themeColor = (type === 'heat') ? "#e67e22" : (type === 'redox' ? "#9b59b6" : "#27ae60");
        
        // نظام الألوان البصري (كشف الحالة)
        var bgColor = "#ffffff"; // افتراضي أبيض
        var textColor = "#333";

        if (res.note.includes("بني محمر")) bgColor = "#fdebd0"; 
        if (res.note.includes("أزرق")) bgColor = "#ebf5fb";
        if (res.note.includes("أخضر")) bgColor = "#e9f7ef";
        if (res.note.includes("أصفر")) bgColor = "#fef9e7";
        if (res.note.includes("أسود")) { bgColor = "#2c3e50"; textColor = "#fff"; }

        container.innerHTML = 
            '<div class="res-box ' + type + '" style="padding:25px; background:' + bgColor + '; color:' + textColor + '; border-radius:15px; text-align:right; border-right: 10px solid ' + themeColor + '; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.5s ease;">' +
                '<div class="badge" style="background:' + themeColor + '; color:white; padding:5px 15px; border-radius:20px; display:inline-block; font-weight:bold; margin-bottom:15px;">✨ نتيجة المختبر</div>' +
                '<h2 style="font-size:2.5rem; margin:10px 0; font-family: Consolas, monospace; direction: ltr; text-align: center; letter-spacing: 2px;">' + res.full + ' &rarr; ' + res.result + '</h2>' +
                '<div style="height:2px; background:rgba(0,0,0,0.05); margin:15px 0;"></div>' +
                '<p style="font-size:1.3rem; line-height:1.6;"><strong>📝 الملاحظة المخبرية:</strong> ' + res.note + '</p>' +
            '</div>';
            
        // إضافة تأثير اهتزاز خفيف عند ظهور النتيجة
        container.style.animation = "none";
        setTimeout(() => { container.style.animation = "shake 0.5s ease"; }, 10);
    } else {
        container.innerHTML = '<div class="res-box error" style="background:#fff3f3; color:#c0392b; padding:20px; border-radius:12px; border:2px dashed #c0392b; text-align:right; font-weight:bold;">⚠️ لم يتم تسجيل هذا التفاعل في قاعدة بياناتنا بعد. ابحث عن تفاعل آخر!</div>';
    }
}



// 2. محرك حساب الكتلة المولية مع التصحيح التلقائي للحروف
function showMolarResult() {
    let input = document.getElementById('formula-input').value.trim();
    const resultDiv = document.getElementById('molar-result');
    
    if (!input) {
        resultDiv.textContent = "⚠️ يرجى كتابة صيغة صحيحة.";
        return;
    }

    // تصحيح الحروف تلقائياً (مثلاً h2so4 تصبح H2SO4)
    // بيمسك أي حرف صغير مش في مكانه ويحوله لـ Capital لو هو بداية عنصر
    let correctedFormula = input.replace(/([a-z])([a-z]*)/gi, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });

    // استدعاء دالة الحساب المنطقية
    const mass = calculateMolarMass(correctedFormula);
    
    if (mass > 0) {
        resultDiv.innerHTML = 
            '<div style="background: rgba(0, 255, 136, 0.1); padding: 10px; border-radius: 5px; border-right: 4px solid #00ff88;">' +
                'الكتلة المولية لـ (<strong>' + correctedFormula + '</strong>) هي: ' +
                '<span style="font-size: 1.8rem; color: #00ff88; margin-right: 10px;">' + mass + '</span> جم/مول' +
            '</div>';
    } else {
        resultDiv.innerHTML = '<span style="color: #ff4444;">⚠️ خطأ في الصيغة! تأكد من كتابة رموز العناصر بشكل صحيح.</span>';
    }
}

// 3. المنطق الرياضي لتفكيك الصيغة وجمع الكتل


function calculateMolarMass(formula) {
    // 1. تصحيح ذكي: تحويل أي حرف صغير يتبع رقم إلى كبير (مثل h2 -> H2 أو o4 -> O4)
    let fixedFormula = formula.replace(/(\d)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    // 2. تصحيح الحرف الأول لو كتبه صغير
    fixedFormula = fixedFormula.charAt(0).toUpperCase() + fixedFormula.slice(1);

    const regex = /([A-Z][a-z]*)(\d*)/g;
    let totalMass = 0, match, foundAny = false;

    while ((match = regex.exec(fixedFormula)) !== null) {
        let symbol = match[1];
        let count = parseInt(match[2]) || 1;
        
        if (typeof MAP !== 'undefined' && MAP[symbol]) {
            totalMass += parseFloat(MAP[symbol].mass) * count;
            foundAny = true;
        }
    }
    return foundAny ? totalMass.toFixed(3) : 0;
}



// 2. إعدادات التشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    buildCompleteSystem(); // بناء الجدول الدوري

    var card = document.querySelector(".details-card");
    if (card) makeDraggable(card); // تفعيل سحب البطاقة

    // ملء القوائم بالعناصر والمركبات
    var slots = [document.getElementById("slot-1"), document.getElementById("slot-2")];
    slots.forEach(function(slot) {
        if (!slot) return;
        slot.innerHTML = '<option value="">-- اختر مادة --</option>';
        
        // إضافة العناصر
        if (typeof ELEMENTS !== 'undefined') {
            ELEMENTS.forEach(function(el) {
                var option = document.createElement("option");
                option.value = el.sym;
                option.text = el.sym + " - " + el.name_ar;
                slot.appendChild(option);
            });
        }

        // إضافة المركبات من مكتبة الكيمياء
        if (typeof CHEMISTRY_DATABASE !== 'undefined') {
            var sep = document.createElement("option");
            sep.disabled = true;
            sep.text = "---------- مركبات ----------";
            slot.appendChild(sep);

            Object.keys(CHEMISTRY_DATABASE.heatLibrary).forEach(function(c) {
                var option = document.createElement("option");
                option.value = c;
                option.text = "🧪 " + c;
                slot.appendChild(option);
            });
        }
    });

    // ربط الأزرار
	
    document.getElementById("react-btn").onclick = processReaction;
    document.getElementById("heat-btn").onclick = processHeat;
    document.getElementById("clear-btn").onclick = clearLab;


    // تفعيل التحديث التلقائي (السطرين اللذين سألت عنهما)
    document.getElementById('slot-1').onchange = processReaction;
    document.getElementById('slot-2').onchange = processReaction;
});


function clearLab() {
	
    document.getElementById('slot-1').selectedIndex = 0;
    document.getElementById('slot-2').selectedIndex = 0;
    document.getElementById('lab-report').innerHTML = "المعمل جاهز.. اختر المواد وابدأ التفاعل";
}

/* ============================================================
   3. نظام السحب والتشغيل النهائي (Initialization)
   ============================================================ */


// 3. ملء قوائم المعمل (عناصر + مسح شامل لكل المنهج والعضوية)
    var slots = [document.getElementById("slot-1"), document.getElementById("slot-2")];
    slots.forEach(function(slot) {
        if (!slot) return;
        slot.innerHTML = '<option value="">-- اختر مادة --</option>';
        
        // أ. إضافة العناصر الأساسية (من مصفوفة ELEMENTS)
        if (typeof ELEMENTS !== 'undefined') {
            ELEMENTS.forEach(function(el) {
                var option = document.createElement("option");
                option.value = el.sym;
                option.text = el.sym + " - " + el.name_ar;
                slot.appendChild(option);
            });
        }

        // ب. مسح عبقري لكل الأقسام (عضوية، حديد، أحماض)
        if (typeof CHEMISTRY_DATABASE !== 'undefined') {
            var sep = document.createElement("option");
            sep.disabled = true;
            sep.text = "---------- مركبات ومواد كيميائية ----------";
            slot.appendChild(sep);

            var allFound = {}; // لمنع التكرار

            // وظيفة بتلف على كل قسم وتطلع المواد اللي جواه
            function scanSection(lib) {
                Object.keys(lib).forEach(function(fullKey) {
                    // تفكيك المفتاح لو فيه (+) زي CH4+O2
                    var parts = fullKey.split('+');
                    parts.forEach(function(item) {
                        // أي حاجة مش عنصر حرف واحد أو اتنين (زي H أو Fe) 
                        // أو مواد مشهورة ضفتها يدوي زي CH4 و HCl
                        allFound[item] = true;
                    });
                });
            }

            // تشغيل المسح على كل اللي أنت بعته
            scanSection(CHEMISTRY_DATABASE.specialReactions);
            scanSection(CHEMISTRY_DATABASE.heatLibrary);
            scanSection(CHEMISTRY_DATABASE.redoxLibrary);

            // ترتيب المواد أبجدياً وإضافتها للقائمة
            Object.keys(allFound).sort().forEach(function(comp) {
                // نمنع إضافة العناصر اللي اتضافت فوق عشان ميبقاش فيه تكرار
                var isElement = false;
                if(typeof ELEMENTS !== 'undefined') {
                    isElement = ELEMENTS.some(function(e){ return e.sym === comp; });
                }
                
                if (!isElement) {
                    var option = document.createElement("option");
                    option.value = comp;
                    option.text = "🧪 " + comp;
                    slot.appendChild(option);
                }
            });
        }
    });




function makeDraggable(el) {
    var isDragging = false, offsetX, offsetY;
    var header = el.querySelector('.card-header') || el;

    header.onmousedown = function(e) {
        if (e.target.closest('button, input')) return;
        isDragging = true;
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
        el.style.zIndex = "1000";
    };

    document.onmousemove = function(e) {
        if (!isDragging) return;
        el.style.position = "fixed";
        el.style.left = (e.clientX - offsetX) + "px";
        el.style.top = (e.clientY - offsetY) + "px";
        el.style.margin = "0";
    };

    document.onmouseup = function() { isDragging = false; };
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. بناء الجدول الدوري
    buildCompleteSystem();

    // 2. تفعيل السحب للبطاقة
    var card = document.querySelector(".details-card");
    if (card) makeDraggable(card);






// 4. ربط أزرار المعمل وتفعيل التحديث التلقائي
    var btnReact = document.getElementById("react-btn");
    var btnHeat = document.getElementById("heat-btn");
    var btnClear = document.getElementById("clear-btn");

    if (btnReact) btnReact.onclick = processReaction;
    if (btnHeat) btnHeat.onclick = processHeat;
    if (btnClear) btnClear.onclick = clearLab;

    // --- السطرين اللي سألت عنهم هنا ---
    var s1 = document.getElementById('slot-1');
    var s2 = document.getElementById('slot-2');
    
    if (s1) s1.onchange = processReaction;
    if (s2) s2.onchange = processReaction;
    // ----------------------------------
});



// مصفوفة بكل المركبات التي تريدها أن تظهر في الرف

var QUICK_COMPOUNDS = [
    // --- كيمياء عضوية ---
    "CH4", "C2H4", "C2H2", "C2H5OH", "CH3COOH", 
    // --- مركبات الحديد ---
    "Fe2O3", "Fe3O4", "FeO", "FeSO4", "FeCl3", "Fe(OH)3", "FeC2O4", 
    // --- أحماض وأملاح وأكاسيد ---
    "CuO", "NaOH", "HCl", "H2SO4", "AgNO3", "BaCl2", "Na2CO3", "KI", "Pb(NO3)2", "KMnO4"
];

// المتغير الذي سيحدد أي خانة سيتم ملؤها (افتراضياً الخانة الأولى)
var activeSlotId = 'slot-1';



/* ============================================================
   محرك الرف الذكي (سحب تلقائي + حساب فوري + تجربة تفاعل)
   ============================================================ */

function initializeQuickShelf() {
    var shelf = document.getElementById("quick-shelf");
    if (!shelf) return;

    // 1. تجميع عبقري لكل المركبات والعناصر من قاعدة البيانات والجدول الدوري
    var allItems = new Set();
    
    // إضافة القائمة اليدوية إذا وجدت
    if (typeof QUICK_COMPOUNDS !== 'undefined') {
        QUICK_COMPOUNDS.forEach(c => allItems.add(c));
    }

    // سحب كل المكونات من مكتبات التفاعلات (عضوية، حرارية، أكسدة)
    if (typeof CHEMISTRY_DATABASE !== 'undefined') {
        var libs = [
            CHEMISTRY_DATABASE.specialReactions,
            CHEMISTRY_DATABASE.heatLibrary,
            CHEMISTRY_DATABASE.redoxLibrary
        ];
        
        libs.forEach(function(lib) {
            if (lib) {
                Object.keys(lib).forEach(function(key) {
                    key.split('+').forEach(function(item) {
                        if (item.trim().length > 0) allItems.add(item.trim());
                    });
                });
            }
        });
    }

    // 2. بناء الرف بصرياً وبرمجياً
    shelf.innerHTML = "";
    // ترتيب العناصر أبجدياً لسهولة الوصول
    Array.from(allItems).sort().forEach(function(comp) {
        var btn = document.createElement("button");
        btn.textContent = comp;
        
        // التنسيق المتوافق مع واجهتك الداكنة والنيون
        btn.style.cssText = "padding:8px 14px; margin:5px; cursor:pointer; background:#1a1a1a; color:#00d4ff; border:1px solid #00d4ff; border-radius:6px; font-weight:bold; transition: 0.3s; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;";
        
        // تأثيرات الحركية (Hover)
        btn.onmouseover = function() { 
            this.style.background = "#00d4ff"; 
            this.style.color = "#000";
            this.style.boxShadow = "0 0 10px #00d4ff";
        };
        btn.onmouseout = function() { 
            this.style.background = "#1a1a1a"; 
            this.style.color = "#00d4ff";
            this.style.boxShadow = "none";
        };

        // --- منطق التحدي: تنفيذ كل شيء بضغطة واحدة ---
        btn.onclick = function() {
            // أ. تحديث خانات التفاعل
            var targetSlot = document.getElementById(activeSlotId);
            if (targetSlot) {
                // التأكد من وجود المادة في القائمة المنسدلة أولاً لتجنب الأخطاء
                var exists = Array.from(targetSlot.options).some(opt => opt.value === comp);
                if (!exists) {
                    var newOpt = document.createElement("option");
                    newOpt.value = comp; newOpt.text = "🧪 " + comp;
                    targetSlot.add(newOpt);
                }
                targetSlot.value = comp;
                
                // تشغيل محرك التفاعلات فورا
                processReaction(); 
                
                // التبديل التلقائي للخنة التالية لتسهيل خلط مادتين
                activeSlotId = (activeSlotId === 'slot-1') ? 'slot-2' : 'slot-1';
            }

            // ب. تحديث وحساب الكتلة المولية فوراً
            var molarInput = document.getElementById('formula-input');
            if (molarInput) {
                molarInput.value = comp;
                // استدعاء دالة الحساب التي قمنا بتطويرها (الموجودة في ملف script.js)
                if (typeof showMolarResult === 'function') {
                    showMolarResult();
                }
            }
        };
        shelf.appendChild(btn);
    });
}

// تشغيل الرف فور جاهزية الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التأكد من وجود متغير activeSlotId عالمياً
    if (typeof activeSlotId === 'undefined') window.activeSlotId = 'slot-1';
    initializeQuickShelf();
});



/* ============================================================
   1. محرك حساب الكتلة المولية الذكي (يدعم الأقواس والحروف الصغيرة)
   ============================================================ */
function calculateMolarMass(formula) {
    if (!formula) return 0;

    // أ. معالجة الأقواس: (NO3)2 تتحول برمجياً لـ N2O6 لسهولة الحساب
    let processed = formula.replace(/\(([^)]+)\)(\d+)/g, (match, content, multiplier) => {
        return content.replace(/([A-Z][a-z]*)(\d*)/g, (m, sym, num) => {
            let count = (parseInt(num) || 1) * parseInt(multiplier);
            return sym + count;
        });
    });

    // ب. تصحيح ذكي للحروف: تحويل h2 لـ H2 و o4 لـ O4 أوتوماتيكياً
    processed = processed.replace(/(\d)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
    if (processed[0]) processed = processed[0].toUpperCase() + processed.slice(1);

    const regex = /([A-Z][a-z]*)(\d*)/g;
    let totalMass = 0, found = false;
    let match;

    while ((match = regex.exec(processed)) !== null) {
        let symbol = match[1];
        let count = parseInt(match[2]) || 1;
        
        // البحث في قاعدة بيانات العناصر (MAP)
        if (typeof MAP !== 'undefined' && MAP[symbol]) {
            totalMass += parseFloat(MAP[symbol].mass) * count;
            found = true;
        }
    }
    return found ? totalMass.toFixed(3) : 0;
}

/* ============================================================
   2. وظيفة عرض نتيجة الكتلة في الواجهة
   ============================================================ */
   
   function showMolarResult() {
    let input = document.getElementById('formula-input').value.trim();
    const resultDiv = document.getElementById('molar-result');
    
    if (!input) {
        resultDiv.innerHTML = "⚠️ يرجى كتابة صيغة صحيحة.";
        return;
    }

    const mass = calculateMolarMass(input);
    
    if (mass > 0) {
		
		// التعديل داخل دالة showMolarResult في الجزء الخاص بالنتيجة
resultDiv.innerHTML = 
    '<div style="background: rgba(0, 212, 255, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(0, 212, 255, 0.3); color: #fff;">' +
        '<div style="margin-bottom: 10px;">' +
            'الكتلة المولية لـ (<strong>' + input.toUpperCase() + '</strong>) هي: ' +
            '<span style="font-size: 1.8rem; color: #00d4ff; font-weight: bold; margin-left: 10px; text-shadow: 0 0 10px rgba(0,212,255,0.5);">' + mass + '</span> جم/مول' +
        '</div>' +
        // التنبيه "الألطف" اللي طلبت تعديله
        '<div style="font-size: 0.85rem; color: #888; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px;">' +
            '✨ <em>ملاحظة: هذه القيمة تأكيدية لغرض الدقة العلمية؛ قد تلاحظ فروقاً بسيطة جداً عن الكتب المدرسية نتيجة استخدام كتل ذرية بكسور دقيقة.</em>' +
        '</div>' +
    '</div>';
		
    } else {
        resultDiv.innerHTML = '<span style="color: #ff4444;">⚠️ خطأ: تأكد من كتابة الصيغة بشكل صحيح (مثال: H2O أو Pb(NO3)2).</span>';
    }
}





// دالة مشاركة النتيجة
function shareResult(res) {
    var text = "🧪 *معمل الكيمياء الذكي* 🧪\n\n" +
               "لقد قمت بإجراء تفاعل:\n" +
               "✅ *" + res.full + " → " + res.result + "*\n\n" +
               "📝 *الملاحظة:* " + res.note + "\n\n" +
               "🚀 جرب معملك الخاص الآن مجاناً:";
    
    var url = window.location.href;
    var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url);
    window.open(whatsappUrl, '_blank');
}

// تحديث بسيط لدالة العرض عشان تظهر زرار المشاركة
var originalRender = renderLabResult;
renderLabResult = function(res, type, container) {
    originalRender(res, type, container); // تشغيل العرض الأصلي
    
    var shareDiv = document.getElementById("share-container");
    if (res && shareDiv) {
        shareDiv.style.display = "block";
        document.getElementById("share-btn").onclick = function() { shareResult(res); };
    } else if (shareDiv) {
        shareDiv.style.display = "none";
    }
};
