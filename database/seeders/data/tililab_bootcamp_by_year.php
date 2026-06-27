<?php

/**
 * Tililab bootcamp programmes by edition year.
 *
 * @return array<string, array<string, mixed>>
 */
$sharedContext = [
    'en' => 'The 2M Parity & Diversity Committee organises TILILAB, an annual competition rewarding an original video creation by a young talent, offering a fresh perspective on parity. Held alongside the Tilila Trophy, the contest aims to uncover new talent and train young content creators in gender equality and fighting female stereotypes. The competition unfolds in two phases: the Bootcamp and production.',
    'fr' => 'Le Comité Parité et Diversité de 2M organise TILILAB, un concours annuel récompensant une œuvre de création d\'une vidéo originale, portée par un jeune talent. Cette œuvre devra proposer un regard novateur sur la parité. L\'objectif de ce concours – organisé en marge du Trophée Tilila – est de faire émerger de nouveaux talents, de sensibiliser et de former les jeunes créateurs de contenu aux valeurs de l\'égalité femme-homme et à la lutte contre les stéréotypes féminins. Le concours se déroule en deux phases : le Bootcamp et la production.',
    'ar' => 'ينظم لجنة المساواة والتنوع في 2M مسابقة TILILAB السنوية التي تكافئ إبداع فيديو أصلي من شاب موهوب، يقدم نظرة جديدة حول المساواة. يهدف هذا المسابقة – المنظمة على هامش كأس تيليلا – إلى اكتشاف مواهب جديدة وتدريب صناع المحتوى الشباب على قيم المساواة بين الجنسين ومكافحة الصور النمطية عن المرأة. تتكون المسابقة من مرحلتين: المعسكر والإنتاج.',
];

return [
    '2021' => [
        'title' => [
            'en' => "Tililab's Bootcamp 2021",
            'fr' => 'TILILAB\'S BOOTCAMP 2021',
            'ar' => 'معسكر تيليلاب 2021',
        ],
        'context' => $sharedContext,
        'dates' => [
            'en' => '9–12 September 2021',
            'fr' => '9–12 septembre 2021',
            'ar' => '9–12 سبتمبر 2021',
        ],
        'location' => [
            'en' => 'Le Bled, Marrakech',
            'fr' => 'Le Bled – Marrakech',
            'ar' => 'لو بليد، مراكش',
        ],
        'masters_of_ceremony' => [
            ['name' => 'Reda Taleb', 'role' => ['en' => 'CEO, Officium Maroc', 'fr' => 'DG d\'Officium', 'ar' => 'المدير العام لـ Officium']],
        ],
        'days' => [
            [
                'label' => ['en' => 'Wednesday 8 September', 'fr' => 'Mercredi 8 septembre', 'ar' => 'الأربعاء 8 سبتمبر'],
                'sessions' => [
                    ['time' => '', 'title' => ['en' => 'All participants required to take a PCR test to ensure the bootcamp runs smoothly', 'fr' => 'Tous les participants seront tenus d\'effectuer un test PCR pour garantir le bon déroulement du bootcamp', 'ar' => 'يُطلب من جميع المشاركين إجراء فحص PCR لضمان سير المعسكر بسلاسة'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Thursday 9 September', 'fr' => 'Jeudi 9 septembre', 'ar' => 'الخميس 9 سبتمبر'],
                'sessions' => [
                    ['time' => '15:00', 'title' => ['en' => 'Departure from 2M premises', 'fr' => 'Démarrage depuis les locaux de 2M', 'ar' => 'الانطلاق من مقر 2M'], 'speakers' => []],
                    ['time' => '18:30', 'title' => ['en' => 'Arrival on site & check-in', 'fr' => 'Arrivée sur les lieux et check-in', 'ar' => 'الوصول وتسجيل الدخول'], 'speakers' => []],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner — welcome address, Tilila initiative presentation, Tililab bootcamp & speakers overview', 'fr' => 'Dîner — Accueil et mot de bienvenue, présentation de l\'initiative TILILA, présentation du Bootcamp TILILAB, des intervenants et du déroulé', 'ar' => 'عشاء — ترحيب وعرض مبادرة تيليلا ومعسكر تيليلاب والمتحدثين'], 'speakers' => []],
                    ['time' => '23:00', 'title' => ['en' => 'End of dinner', 'fr' => 'Fin du dîner', 'ar' => 'نهاية العشاء'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Friday 10 September', 'fr' => 'Vendredi 10 septembre', 'ar' => 'الجمعة 10 سبتمبر'],
                'sessions' => [
                    ['time' => '07:30', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Conference: Women in Moroccan media (30 min)', 'fr' => 'Conférence : État des lieux de la présence de la femme dans les médias au Maroc (30 min)', 'ar' => 'مؤتمر: واقع حضور المرأة في الإعلام المغربي (30 دقيقة)'], 'speakers' => [['name' => 'Reda Essakalli', 'role' => ['en' => 'Marketing, communication & brand strategy expert', 'fr' => 'Expert en Stratégie Marketing, Communication et Brand Management', 'ar' => 'خبير استراتيجية التسويق والاتصال']]]],
                    ['time' => '09:30', 'title' => ['en' => 'Videos: screening of 10 spots from the previous edition + candidate reactions (1h)', 'fr' => 'VIDÉOS : Projection des 10 spots de la précédente édition + réactions des candidats (1h)', 'ar' => 'فيديوهات: عرض 10 إعلانات من الدورة السابقة + تفاعل المرشحين (ساعة)'], 'speakers' => []],
                    ['time' => '10:45', 'title' => ['en' => 'Masterclass 1: From marketing strategy to concept (1h)', 'fr' => 'Master class 1 : De la stratégie marketing au concept (1h)', 'ar' => 'ماستركلاس 1: من الاستراتيجية التسويقية إلى المفهوم (ساعة)'], 'speakers' => [['name' => 'Maria Aït M\'hamed', 'role' => ['en' => 'President, UACC & CEO Bonzai Agency', 'fr' => 'Présidente de l\'UACC et Directrice Générale de Bonzai Agency', 'ar' => 'رئيسة UACC ومديرة Bonzai Agency']]]],
                    ['time' => '12:00', 'title' => ['en' => 'Masterclass 2: From concept to production (1h)', 'fr' => 'Master class 2 : Du concept à la production (1h)', 'ar' => 'ماستركلاس 2: من المفهوم إلى الإنتاج (ساعة)'], 'speakers' => [['name' => 'Imane Aouad', 'role' => ['en' => 'Creative Director, RAPP-Tribal DDB', 'fr' => 'Directrice de Création chez RAPP-Tribal DDB', 'ar' => 'مديرة إبداع']], ['name' => 'Chaimaa Fachtar', 'role' => ['en' => 'Senior Executive Producer, Ziet Production', 'fr' => 'Senior Executive Producer chez Ziet Production', 'ar' => 'منتجة تنفيذية']]]],
                    ['time' => '13:00', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '15:00', 'title' => ['en' => 'Testimonial: Brand content — director\'s view (30 min)', 'fr' => 'Testimonial : Brand content, point de vue du réalisateur (30 min)', 'ar' => 'شهادة: محتوى العلامة التجارية — وجهة نظر المخرج (30 دقيقة)'], 'speakers' => [['name' => 'Amir Rouani', 'role' => ['en' => 'Director', 'fr' => 'Réalisateur', 'ar' => 'مخرج']]]],
                    ['time' => '15:30', 'title' => ['en' => 'Workshop: concept development from a brief (3h30)', 'fr' => 'Workshop : Élaboration d\'un concept par candidat sur la base d\'un brief (3h30)', 'ar' => 'ورشة: إعداد مفهوم لكل مرشح بناءً على بريف (3 ساعات و30 دقيقة)'], 'speakers' => []],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner', 'fr' => 'Dîner', 'ar' => 'عشاء'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Saturday 11 September', 'fr' => 'Samedi 11 septembre', 'ar' => 'السبت 11 سبتمبر'],
                'sessions' => [
                    ['time' => '07:30', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Masterclass 3: How to sell your idea (30 min)', 'fr' => 'Master Class 3 : Comment vendre son idée (30 min)', 'ar' => 'ماستركلاس 3: كيف تبيع فكرتك (30 دقيقة)'], 'speakers' => [['name' => 'Maria Aït M\'hamed']]],
                    ['time' => '09:30', 'title' => ['en' => 'Individual coaching sessions (1h30) — 30 min per candidate', 'fr' => 'Séances individuelles de coaching (1h30) — Maria Aït M\'hamed & Amir Rouani (30 min chaque candidat)', 'ar' => 'جلسات تدريب فردية (ساعة و30 دقيقة) — 30 دقيقة لكل مرشح'], 'speakers' => [['name' => 'Maria Aït M\'hamed'], ['name' => 'Amir Rouani']]],
                    ['time' => '11:30', 'title' => ['en' => 'Individual pitch preparation', 'fr' => 'Préparation individuelle des pitchs', 'ar' => 'تحضير فردي للعروض'], 'speakers' => []],
                    ['time' => '13:00', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '14:30', 'title' => ['en' => 'Pitch presentations & evaluation — 3 candidates (20 min each + 10 min Q&A, 1h30)', 'fr' => 'Présentation et évaluation des pitchs — 3 candidats (20 min chacun + 10 min Q&A, 1h30)', 'ar' => 'عرض وتقييم العروض — 3 مرشحين (20 دقيقة + 10 دقائق أسئلة)'], 'speakers' => []],
                    ['time' => '16:30', 'title' => ['en' => 'Pitch presentations & evaluation — 3 candidates (20 min each + 10 min Q&A, 1h30)', 'fr' => 'Présentation et évaluation des pitchs — 3 candidats (20 min chacun + 10 min Q&A, 1h30)', 'ar' => 'عرض وتقييم العروض — 3 مرشحين (20 دقيقة + 10 دقائق أسئلة)'], 'speakers' => []],
                    ['time' => '18:00', 'title' => ['en' => 'End of sessions', 'fr' => 'Fin des travaux', 'ar' => 'نهاية الجلسات'], 'speakers' => []],
                    ['time' => '20:00', 'title' => ['en' => 'Dinner', 'fr' => 'Dîner', 'ar' => 'عشاء'], 'speakers' => []],
                ],
                'jury' => [
                    ['name' => 'Maria Aït M\'hamed'],
                    ['name' => 'Amir Rouani'],
                    ['name' => 'Ali Kettani', 'role' => ['en' => 'Financier & producer', 'fr' => 'Financier et producteur', 'ar' => 'ممول ومنتج']],
                    ['name' => 'Adil Chquiry', 'role' => ['en' => 'Marketing & Digital Director, 2M', 'fr' => 'Directeur Marketing et Digital 2M', 'ar' => 'مدير التسويق والرقمي 2M']],
                ],
            ],
            [
                'label' => ['en' => 'Sunday 12 September', 'fr' => 'Dimanche 12 septembre', 'ar' => 'الأحد 12 سبتمبر'],
                'sessions' => [
                    ['time' => '07:30', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Wrap-up & closing address — technical team assignment & production planning, certificate ceremony', 'fr' => 'Wrap-up et mot de clôture — Affectation des équipes techniques et planning de production, remise des certificats', 'ar' => 'ختام — تكليف الفرق التقنية وتخطيط الإنتاج وتوزيع الشهادات'], 'speakers' => []],
                    ['time' => '11:45', 'title' => ['en' => 'Check-out', 'fr' => 'Check-out', 'ar' => 'تسجيل المغادرة'], 'speakers' => []],
                    ['time' => '12:00', 'title' => ['en' => 'Lunch on site', 'fr' => 'Déjeuner sur place', 'ar' => 'غداء في الموقع'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Departure to Casablanca', 'fr' => 'Départ vers Casablanca', 'ar' => 'المغادرة نحو الدار البيضاء'], 'speakers' => []],
                ],
            ],
        ],
    ],
    '2022' => [
        'title' => [
            'en' => "Tililab's Bootcamp 2022",
            'fr' => 'TILILAB\'S BOOTCAMP 2022',
            'ar' => 'معسكر تيليلاب 2022',
        ],
        'context' => $sharedContext,
        'dates' => [
            'en' => '14–17 September 2022',
            'fr' => '14–17 septembre 2022',
            'ar' => '14–17 سبتمبر 2022',
        ],
        'location' => [
            'en' => 'Le Bled, Marrakech',
            'fr' => 'Le Bled – Marrakech',
            'ar' => 'لو بليد، مراكش',
        ],
        'masters_of_ceremony' => [
            ['name' => 'Reda Taleb', 'role' => ['en' => 'CEO, Officium Maroc', 'fr' => 'MC', 'ar' => 'مقدم الحفل']],
        ],
        'days' => [
            [
                'label' => ['en' => 'Wednesday 14 September', 'fr' => 'Mercredi 14 septembre', 'ar' => 'الأربعاء 14 سبتمبر'],
                'sessions' => [
                    ['time' => '15:00', 'title' => ['en' => 'Departure from 2M premises', 'fr' => 'Départ depuis les locaux de 2M', 'ar' => 'الانطلاق من مقر 2M'], 'speakers' => []],
                    ['time' => '18:30', 'title' => ['en' => 'Arrival on site & check-in', 'fr' => 'Arrivée sur les lieux et check-in', 'ar' => 'الوصول وتسجيل الدخول'], 'speakers' => []],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner — welcome, Tilila & Tililab bootcamp presentations', 'fr' => 'Dîner — Accueil et mot de bienvenue, présentation TILILA, présentation du Bootcamp TILILAB, des intervenants et du déroulé', 'ar' => 'عشاء — ترحيب وعرض تيليلا ومعسكر تيليلاب'], 'speakers' => []],
                    ['time' => '23:00', 'title' => ['en' => 'End of dinner', 'fr' => 'Fin du dîner', 'ar' => 'نهاية العشاء'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Thursday 15 September', 'fr' => 'Jeudi 15 septembre', 'ar' => 'الخميس 15 سبتمبر'],
                'sessions' => [
                    ['time' => '07:30', 'title' => ['en' => 'Breakfast kick-off', 'fr' => 'Petit déjeuner Kick-off', 'ar' => 'فطور الانطلاق'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Conference: Women in Moroccan media (30 min)', 'fr' => 'Conférence : État des lieux de la présence de la femme dans les médias au Maroc (30 min)', 'ar' => 'مؤتمر: واقع حضور المرأة في الإعلام المغربي (30 دقيقة)'], 'speakers' => [['name' => 'Nadia Lamhmaidi', 'role' => ['en' => 'Journalism professor, expert on women\'s image in media', 'fr' => 'Professeure de journalisme, experte de l\'image de la femme dans les médias', 'ar' => 'أستاذة الصحافة، خبيرة صورة المرأة في الإعلام']]]],
                    ['time' => '09:30', 'title' => ['en' => 'Videos: screening of ads deemed stereotypical + candidate reactions (1h)', 'fr' => 'VIDÉOS : Projection de publicités jugées « stéréotypées » + réactions des candidats (1h)', 'ar' => 'فيديوهات: عرض إعلانات تُعتبر نمطية + تفاعل المرشحين (ساعة)'], 'speakers' => []],
                    ['time' => '10:45', 'title' => ['en' => 'Masterclass 1: Inclusive marketing — what process? (1h)', 'fr' => 'Master class 1 : Le marketing inclusif, quel processus ? (1h)', 'ar' => 'ماستركلاس 1: التسويق الشامل، ما العملية؟ (ساعة)'], 'speakers' => [['name' => 'Youssef Cheikhi', 'role' => ['en' => 'Communication Director, OFPPT & President, Moroccan Advertisers Group (Tilila Trophy 2021 winner)', 'fr' => 'Directeur de la communication de l\'OFPTT, Président du GAM (Gagnant du Trophée Tilila 2021)', 'ar' => 'مدير الاتصال OFPPT ورئيس مجموعة المعلنين']]]],
                    ['time' => '12:00', 'title' => ['en' => 'Masterclass 2: Translating a strategic vision into advertising (1h)', 'fr' => 'Master class 2 : Traduire une vision stratégique et un produit publicitaire (1h)', 'ar' => 'ماستركلاس 2: ترجمة رؤية استراتيجية ومنتج إعلاني (ساعة)'], 'speakers' => [['name' => 'Mounia Chkouri', 'role' => ['en' => 'CEO, MashUp & Secretary General, UACC', 'fr' => 'DG de MashUp et Secrétaire Générale de l\'UACC', 'ar' => 'مديرة MashUp والأمينة العامة لـ UACC']]]],
                    ['time' => '13:00', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '15:00', 'title' => ['en' => 'Testimonial: Responsible advertising — director\'s view (30 min)', 'fr' => 'Testimonial : La publicité responsable, point de vue du réalisateur (30 min)', 'ar' => 'شهادة: الإعلان المسؤول — وجهة نظر المخرج (30 دقيقة)'], 'speakers' => [['name' => 'Hicham Lasri', 'role' => ['en' => 'Director', 'fr' => 'Réalisateur', 'ar' => 'مخرج']]]],
                    ['time' => '15:30', 'title' => ['en' => 'Workshop: concept on a fictional brief — inclusive Made in Morocco campaign (3h30)', 'fr' => 'Workshop : Élaboration d\'un concept sur la base d\'un brief fictif — communiquer autour du made in Morocco à travers une campagne inclusive (3h30)', 'ar' => 'ورشة: إعداد مفهوم بناءً على بريف وهمي — حملة شاملة حول الصنع المغربي (3 ساعات و30 دقيقة)'], 'speakers' => [['name' => 'Anouar Sabri', 'role' => ['en' => 'President, Les Impériales', 'fr' => 'Président de l\'association « Les Impériales »', 'ar' => 'رئيس جمعية Les Impériales']]]],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner', 'fr' => 'Dîner', 'ar' => 'عشاء'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Friday 16 September', 'fr' => 'Vendredi 16 septembre', 'ar' => 'الجمعة 16 سبتمبر'],
                'sessions' => [
                    ['time' => '07:30', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Masterclass 3: How to pitch (30 min)', 'fr' => 'Master Class 3 : Comment pitcher (30 min)', 'ar' => 'ماستركلاس 3: كيف تعرض فكرتك (30 دقيقة)'], 'speakers' => [['name' => 'Youssef Ksiyer', 'role' => ['en' => 'JooJ Media Manager', 'fr' => 'Responsable de JooJ Media', 'ar' => 'مسؤول JooJ Media']]]],
                    ['time' => '09:30', 'title' => ['en' => 'Individual coaching (1h30) — 15 min per candidate', 'fr' => 'Séances individuelles de coaching (1h30) — Maria Aït M\'hamed, DG Bonzai et Présidente UACC (15 min chaque candidat)', 'ar' => 'تدريب فردي (ساعة و30 دقيقة) — 15 دقيقة لكل مرشح'], 'speakers' => [['name' => 'Maria Aït M\'hamed', 'role' => ['en' => 'CEO, Bonzai & President, UACC', 'fr' => 'DG de Bonzai et Présidente de l\'UACC', 'ar' => 'مديرة Bonzai ورئيسة UACC']]]],
                    ['time' => '11:30', 'title' => ['en' => 'Individual pitch preparation', 'fr' => 'Préparation individuelle des pitchs', 'ar' => 'تحضير فردي للعروض'], 'speakers' => []],
                    ['time' => '13:00', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '14:30', 'title' => ['en' => 'Pitch presentations & evaluation — 3 candidates (20 min + 10 min Q&A, 1h30)', 'fr' => 'Présentation et évaluation des pitchs — 3 candidats (20 min chacun + 10 min Q&A, 1h30)', 'ar' => 'عرض وتقييم العروض — 3 مرشحين'], 'speakers' => []],
                    ['time' => '16:30', 'title' => ['en' => 'Pitch presentations & evaluation — 3 candidates (20 min + 10 min Q&A, 1h30)', 'fr' => 'Présentation et évaluation des pitchs — 3 candidats (20 min chacun + 10 min Q&A, 1h30)', 'ar' => 'عرض وتقييم العروض — 3 مرشحين'], 'speakers' => []],
                    ['time' => '18:00', 'title' => ['en' => 'End of sessions', 'fr' => 'Fin des travaux', 'ar' => 'نهاية الجلسات'], 'speakers' => []],
                    ['time' => '20:00', 'title' => ['en' => 'Dinner', 'fr' => 'Dîner', 'ar' => 'عشاء'], 'speakers' => []],
                ],
                'jury' => [
                    ['name' => 'Khadija Boujanoui', 'role' => ['en' => 'Deputy CEO & President, Parity & Diversity Committee 2M', 'fr' => 'DGA et Présidente du Comité Parité et Diversité 2M', 'ar' => 'نائبة المدير العام ورئيسة لجنة المساواة والتنوع 2M']],
                    ['name' => 'Hicham Lasri'],
                    ['name' => 'Anouar Sabri'],
                    ['name' => 'Maria Aït M\'hamed'],
                ],
            ],
            [
                'label' => ['en' => 'Saturday 17 September', 'fr' => 'Samedi 17 septembre', 'ar' => 'السبت 17 سبتمبر'],
                'sessions' => [
                    ['time' => '07:30', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Wrap-up & closing — technical team assignment, production planning, certificate ceremony', 'fr' => 'Wrap-up et mot de clôture — Affectation des équipes techniques et planning de production, remise des certificats', 'ar' => 'ختام — تكليف الفرق التقنية وتوزيع الشهادات'], 'speakers' => []],
                    ['time' => '11:45', 'title' => ['en' => 'Check-out', 'fr' => 'Check-out', 'ar' => 'تسجيل المغادرة'], 'speakers' => []],
                    ['time' => '12:00', 'title' => ['en' => 'Lunch on site', 'fr' => 'Déjeuner sur place', 'ar' => 'غداء في الموقع'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Departure to Casablanca', 'fr' => 'Départ vers Casablanca', 'ar' => 'المغادرة نحو الدار البيضاء'], 'speakers' => []],
                ],
            ],
        ],
    ],
    '2023' => [
        'title' => [
            'en' => 'Tililab Bootcamp Programme 2023',
            'fr' => 'Programme Bootcamp TILILAB 2023',
            'ar' => 'برنامج معسكر تيليلاب 2023',
        ],
        'dates' => [
            'en' => '22 & 25 September 2023',
            'fr' => '22 & 25 septembre 2023',
            'ar' => '22 و 25 سبتمبر 2023',
        ],
        'location' => [
            'en' => 'LionsGeek & Marrakech',
            'fr' => 'LionsGeek & Marrakech',
            'ar' => 'LionsGeek ومراكش',
        ],
        'masters_of_ceremony' => [
            ['name' => 'Reda Taleb', 'role' => ['en' => 'CEO, Officium Maroc', 'fr' => 'CEO de Officium Maroc', 'ar' => 'المدير العام Officium Maroc']],
        ],
        'days' => [
            [
                'label' => ['en' => 'Friday 22 September', 'fr' => 'Vendredi 22 septembre 2023', 'ar' => 'الجمعة 22 سبتمبر 2023'],
                'sessions' => [
                    ['time' => '08:30', 'title' => ['en' => 'Welcome coffee', 'fr' => 'Café d\'accueil', 'ar' => 'قهوة ترحيب'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Moment of silence for earthquake victims', 'fr' => 'Minute de recueillement à la mémoire des victimes du séisme', 'ar' => 'دقيقة صمت على ضحايا الزلزال'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Opening remarks', 'fr' => 'Mot d\'ouverture', 'ar' => 'كلمة افتتاحية'], 'speakers' => [['name' => 'Reda Taleb', 'role' => ['en' => 'CEO, Officium Maroc', 'fr' => 'CEO de Officium Maroc', 'ar' => 'المدير العام Officium Maroc']]]],
                    ['time' => '09:00', 'title' => ['en' => 'LionsGeek presentation', 'fr' => 'Présentation Lions Geek', 'ar' => 'عرض Lions Geek'], 'speakers' => [['name' => 'Mahdi Bouziane', 'role' => ['en' => 'Executive Director, Lions Geek', 'fr' => 'Executive Director Lions Geek', 'ar' => 'المدير التنفيذي Lions Geek']]]],
                    ['time' => '09:30', 'title' => ['en' => 'Masterclass 1: From marketing strategy to creative brief', 'fr' => 'Masterclass 1 « De la stratégie marketing au brief créatif »', 'ar' => 'ماستركلاس 1: من الاستراتيجية التسويقية إلى البريف الإبداعي'], 'speakers' => [['name' => 'Guillaume Pendeliau', 'role' => ['en' => 'Vice-President, ZONEBLEUE DDB', 'fr' => 'Vice-Président de ZONEBLEUE DDB', 'ar' => 'نائب رئيس ZONEBLEUE DDB']]]],
                    ['time' => '10:30', 'title' => ['en' => 'Coffee break', 'fr' => 'Pause-café', 'ar' => 'استراحة قهوة'], 'speakers' => []],
                    ['time' => '10:45', 'title' => ['en' => 'Masterclass 2: Translating a brief into content', 'fr' => 'Masterclass 2 « Traduction d\'un brief en contenu »', 'ar' => 'ماستركلاس 2: ترجمة البريف إلى محتوى'], 'speakers' => [['name' => 'Actarus', 'role' => ['en' => 'Director', 'fr' => 'Réalisateur', 'ar' => 'مخرج']]]],
                    ['time' => '11:45', 'title' => ['en' => 'Masterclass 3: How to pitch', 'fr' => 'Masterclass 3 « Comment pitcher »', 'ar' => 'ماستركلاس 3: كيف تعرض فكرتك'], 'speakers' => [['name' => 'Chaimae Bentananat', 'role' => ['en' => 'Content creator, Jooj Média', 'fr' => 'Créatrice de contenus à Jooj Média', 'ar' => 'صانعة محتوى في Jooj Média']]]],
                    ['time' => '12:15', 'title' => ['en' => 'Brief presentation + next steps & timeline', 'fr' => 'Présentation du brief + next steps et timeline', 'ar' => 'عرض البريف والخطوات التالية والجدول الزمني'], 'speakers' => [['name' => 'Youssef Ksiyer', 'role' => ['en' => 'Jooj Manager', 'fr' => 'Jooj Manager', 'ar' => 'مدير Jooj']]]],
                    ['time' => '12:45', 'title' => ['en' => 'Closing remarks', 'fr' => 'Mot de clôture', 'ar' => 'كلمة الختام'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Monday 25 September', 'fr' => 'Lundi 25 septembre 2023', 'ar' => 'الاثنين 25 سبتمبر 2023'],
                'sessions' => [
                    ['time' => '08:30', 'title' => ['en' => 'Welcome coffee', 'fr' => 'Café d\'accueil', 'ar' => 'قهوة ترحيب'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Pitch presentations before the jury', 'fr' => 'Présentation des pitchs face au Jury', 'ar' => 'عرض العروض أمام لجنة التحكيم'], 'speakers' => []],
                    ['time' => '10:30', 'title' => ['en' => 'Coffee break', 'fr' => 'Pause-café', 'ar' => 'استراحة قهوة'], 'speakers' => []],
                    ['time' => '10:45', 'title' => ['en' => 'Pitches from the 2 remaining groups', 'fr' => 'Pitch des 2 groupes restants', 'ar' => 'عروض المجموعتين المتبقيتين'], 'speakers' => []],
                    ['time' => '11:45', 'title' => ['en' => 'Wrap-up & closing — technical means & production planning, certificate ceremony', 'fr' => 'Wrap up et mot de clôture — Présentation des moyens techniques et planning de production des spots, remise des attestations', 'ar' => 'ختام — عرض الوسائل التقنية وتخطيط الإنتاج وتوزيع الشهادات'], 'speakers' => [['name' => 'Équipe JOOJ', 'role' => ['en' => 'JOOJ team', 'fr' => 'Équipe JOOJ', 'ar' => 'فريق JOOJ']], ['name' => 'Mahdi Bouziane', 'role' => ['en' => 'Executive Director, Lions Geek', 'fr' => 'Executive Director Lions Geek', 'ar' => 'المدير التنفيذي Lions Geek']]]],
                    ['time' => '13:00', 'title' => ['en' => 'Lunch', 'fr' => 'Lunch', 'ar' => 'غداء'], 'speakers' => []],
                ],
            ],
        ],
    ],
    '2024' => [
        'title' => [
            'en' => 'Tililab Bootcamp Programme 2024',
            'fr' => 'PROGRAMME BOOTCAMP TILILAB 2024',
            'ar' => 'برنامج معسكر تيليلاب 2024',
        ],
        'dates' => [
            'en' => '11–14 September 2024',
            'fr' => '11–14 septembre 2024',
            'ar' => '11–14 سبتمبر 2024',
        ],
        'location' => [
            'en' => 'Le Bled, Marrakech',
            'fr' => 'Le Bled – Marrakech',
            'ar' => 'لو بليد، مراكش',
        ],
        'masters_of_ceremony' => [],
        'days' => [
            [
                'label' => ['en' => 'Wednesday 11 September', 'fr' => 'Mercredi 11 septembre 2024', 'ar' => 'الأربعاء 11 سبتمبر 2024'],
                'sessions' => [
                    ['time' => '14:00', 'title' => ['en' => 'Departure to Marrakech', 'fr' => 'Départ vers Marrakech', 'ar' => 'المغادرة نحو مراكش'], 'speakers' => []],
                    ['time' => '16:30', 'title' => ['en' => 'Arrival & check-in', 'fr' => 'Arrivée et check-in', 'ar' => 'الوصول وتسجيل الدخول'], 'speakers' => []],
                    ['time' => '21:00', 'title' => ['en' => 'Welcome, Tilila & Tililab presentations — dinner + musical entertainment', 'fr' => 'Accueil et mot de bienvenue, présentation TILILA, présentation du Bootcamp TILILAB, des intervenants et du déroulé — Dîner + animation musicale', 'ar' => 'ترحيب وعرض تيليلا وتيليلاب — عشاء وترفيه موسيقي'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Thursday 12 September', 'fr' => 'Jeudi 12 septembre 2024', 'ar' => 'الخميس 12 سبتمبر 2024'],
                'sessions' => [
                    ['time' => '08:00', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit-Déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Conference: Advertising & AI', 'fr' => 'Conférence « Pub et IA »', 'ar' => 'مؤتمر: الإعلان والذكاء الاصطناعي'], 'speakers' => [['name' => 'Mazen Salah', 'role' => ['en' => 'CEO, Big Idea', 'fr' => 'Directeur Général de Big Idea', 'ar' => 'المدير العام Big Idea']]]],
                    ['time' => '10:00', 'title' => ['en' => 'Masterclass: Communication strategy — what place for AI?', 'fr' => 'Masterclass « Stratégie communication : Quelle place pour l\'IA ? »', 'ar' => 'ماستركلاس: استراتيجية الاتصال — ما مكان الذكاء الاصطناعي؟'], 'speakers' => [['name' => 'Badra Makhfi', 'role' => ['en' => 'Head of Marketing & Communication, TotalEnergies', 'fr' => 'Head of Marketing, communication, TotalEnergies', 'ar' => 'رئيسة التسويق والاتصال TotalEnergies']]]],
                    ['time' => '10:45', 'title' => ['en' => 'Coffee break', 'fr' => 'Pause-café', 'ar' => 'استراحة قهوة'], 'speakers' => []],
                    ['time' => '11:00', 'title' => ['en' => 'Masterclass: From client brief to advertising concept in the AI era', 'fr' => 'Masterclass « Du brief client au concept publicitaire à l\'ère de l\'IA »', 'ar' => 'ماستركلاس: من بريف العميل إلى المفهوم الإعلاني في عصر الذكاء الاصطناعي'], 'speakers' => [['name' => 'Ali Rguigue', 'role' => ['en' => 'Owner & GM, Artcoustic', 'fr' => 'Owner & GM Artcoustic', 'ar' => 'المالك والمدير العام Artcoustic']]]],
                    ['time' => '12:30', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Testimonial: Visual storytelling — how to tell a story', 'fr' => 'Testimonial « Visual storytelling : Comment raconter une histoire »', 'ar' => 'شهادة: السرد البصري — كيف نروي قصة'], 'speakers' => [['name' => 'Anas El Gad', 'role' => ['en' => 'Art director / Director', 'fr' => 'Directeur artistique / Réalisateur', 'ar' => 'مدير فني / مخرج']]]],
                    ['time' => '14:30', 'title' => ['en' => 'Testimonial: The art of writing', 'fr' => 'Testimonial « L\'art de l\'écriture »', 'ar' => 'شهادة: فن الكتابة'], 'speakers' => [['name' => 'Basma El Hijri', 'role' => ['en' => 'Screenwriter', 'fr' => 'Scénariste', 'ar' => 'كاتبة سيناريو']]]],
                    ['time' => '15:00', 'title' => ['en' => 'Workshop: brief presentation & concept development', 'fr' => 'Workshop : Présentation du brief et élaboration d\'un concept par les candidats', 'ar' => 'ورشة: عرض البريف وإعداد مفهوم من قبل المرشحين'], 'speakers' => [['name' => 'Maria Aït M\'hamed', 'role' => ['en' => 'President, UACC', 'fr' => 'Présidente UACC', 'ar' => 'رئيسة UACC']]]],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner + musical entertainment', 'fr' => 'Dîner + animation musicale', 'ar' => 'عشاء وترفيه موسيقي'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Friday 13 September', 'fr' => 'Vendredi 13 septembre 2024', 'ar' => 'الجمعة 13 سبتمبر 2024'],
                'sessions' => [
                    ['time' => '09:00', 'title' => ['en' => 'Masterclass: How to pitch', 'fr' => 'Masterclass « Comment pitcher »', 'ar' => 'ماستركلاس: كيف تعرض فكرتك'], 'speakers' => [['name' => 'Samid Ghailane', 'role' => ['en' => 'Editor-in-chief, journalist & host', 'fr' => 'Rédacteur en chef, journaliste et animateur', 'ar' => 'رئيس التحرير وصحفي ومقدم']]]],
                    ['time' => '09:30', 'title' => ['en' => 'Individual coaching sessions (concept + production)', 'fr' => 'Séances individuelles de coaching (Concept + production)', 'ar' => 'جلسات تدريب فردية (المفهوم والإنتاج)'], 'speakers' => []],
                    ['time' => '11:00', 'title' => ['en' => 'Coffee break', 'fr' => 'Pause-café', 'ar' => 'استراحة قهوة'], 'speakers' => []],
                    ['time' => '11:15', 'title' => ['en' => 'Individual pitch preparation', 'fr' => 'Préparation individuelle des pitchs', 'ar' => 'تحضير فردي للعروض'], 'speakers' => []],
                    ['time' => '13:00', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '14:30', 'title' => ['en' => 'Pitch presentations & evaluation — 3 candidates (20 min pitch + 10 min Q&A)', 'fr' => 'Présentation et évaluation des pitchs – 3 candidats (20 min de pitch + 10 min Q&A)', 'ar' => 'عرض وتقييم العروض — 3 مرشحين'], 'speakers' => []],
                    ['time' => '16:00', 'title' => ['en' => 'Coffee break', 'fr' => 'Pause-café', 'ar' => 'استراحة قهوة'], 'speakers' => []],
                    ['time' => '16:15', 'title' => ['en' => 'Pitch presentations & evaluation — 3 candidates (20 min pitch + 10 min Q&A)', 'fr' => 'Présentation et évaluation des pitchs – 3 candidats (20 min de pitch + 10 min Q&A)', 'ar' => 'عرض وتقييم العروض — 3 مرشحين'], 'speakers' => []],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner + musical entertainment', 'fr' => 'Dîner + animation musicale', 'ar' => 'عشاء وترفيه موسيقي'], 'speakers' => []],
                ],
                'jury' => [
                    ['name' => 'Khadija Boujanoui', 'role' => ['en' => 'Support pole Director & President, Parity & Diversity Committee 2M', 'fr' => 'Directrice du pôle support et Présidente du Comité Parité Diversité 2M', 'ar' => 'مديرة القطب الداعم ورئيسة لجنة المساواة والتنوع 2M']],
                    ['name' => 'Basma El Hijri'],
                    ['name' => 'Badra Makhfi'],
                    ['name' => 'Maria Aït M\'hamed'],
                    ['name' => 'Mohammed Grar'],
                    ['name' => 'Ali Rguigue'],
                    ['name' => 'Anas El Gad'],
                    ['name' => 'Mohamed Maati Lahroudi'],
                ],
            ],
            [
                'label' => ['en' => 'Saturday 14 September', 'fr' => 'Samedi 14 septembre 2024', 'ar' => 'السبت 14 سبتمبر 2024'],
                'sessions' => [
                    ['time' => '08:00', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit-Déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Closing session — closing remarks, certificates & photos, production team briefing on shoots & editing', 'fr' => 'Séance de clôture — Mots de clôture + remise des certificats + photos. Point de l\'équipe de PROD avec les candidats sur l\'organisation des tournages et montage des spots', 'ar' => 'جلسة الختام — كلمات ختام وشهادات وصور، اجتماع فريق الإنتاج مع المرشحين'], 'speakers' => [['name' => 'Khadija Boujanoui'], ['name' => 'Omaima Elidrissi'], ['name' => 'Mazen Salah']]],
                    ['time' => '11:45', 'title' => ['en' => 'Check-out', 'fr' => 'Check-out', 'ar' => 'تسجيل المغادرة'], 'speakers' => []],
                    ['time' => '12:30', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Departure to Casablanca', 'fr' => 'Départ vers Casablanca', 'ar' => 'المغادرة نحو الدار البيضاء'], 'speakers' => []],
                ],
            ],
        ],
    ],
    '2025' => [
        'title' => [
            'en' => 'Tililab Bootcamp 2025',
            'fr' => 'Programme bootcamp 2025',
            'ar' => 'معسكر تيليلاب 2025',
        ],
        'dates' => [
            'en' => '10–13 September 2025',
            'fr' => '10–13 septembre 2025',
            'ar' => '10–13 سبتمبر 2025',
        ],
        'location' => [
            'en' => 'Marrakech',
            'fr' => 'Marrakech',
            'ar' => 'مراكش',
        ],
        'masters_of_ceremony' => [
            ['name' => 'Oumeima Elidrissi', 'role' => ['en' => 'Journalist & presenter', 'fr' => 'Journaliste et Présentatrice', 'ar' => 'صحفية ومقدمة']],
            ['name' => 'Reda Taleb', 'role' => ['en' => 'CEO, Officium Maroc', 'fr' => 'CEO Officium Maroc', 'ar' => 'المدير العام Officium Maroc']],
        ],
        'pre_bootcamp' => [
            'title' => ['en' => 'Tililab Pre-Bootcamp 2025', 'fr' => 'Programme Pré-Bootcamp Tililab 2025', 'ar' => 'ما قبل معسكر تيليلاب 2025'],
            'date' => ['en' => 'Thursday 4 September 2025', 'fr' => 'Jeudi 4 septembre 2025', 'ar' => 'الخميس 4 سبتمبر 2025'],
            'location' => ['en' => 'LionsGeek', 'fr' => 'Lions Geek', 'ar' => 'Lions Geek'],
            'sessions' => [
                ['time' => '14:00', 'title' => ['en' => 'Participant welcome & opening address by the Parity & Diversity Committee', 'fr' => 'Accueil des participants et mot d\'ouverture par le Comité Parité & Diversité', 'ar' => 'استقبال المشاركين وكلمة افتتاحية من لجنة المساواة والتنوع'], 'speakers' => []],
                ['time' => '14:30', 'title' => ['en' => 'Video screening: best-of from previous editions + Tilila context reminder', 'fr' => 'Projection vidéo : Best-of des éditions précédentes + rappel du contexte de Tilila', 'ar' => 'عرض فيديو: أفضل لحظات الدورات السابقة + تذكير بسياق تيليلا'], 'speakers' => []],
                ['time' => '14:45', 'title' => ['en' => 'Presentation of selected candidates', 'fr' => 'Présentation des candidats sélectionnés', 'ar' => 'عرض المرشحين المختارين'], 'speakers' => []],
                ['time' => '15:00', 'title' => ['en' => 'Individual pitch sessions — 10 min each (5 min presentation + 5 min Q&A with jury)', 'fr' => 'Session de pitchs individuelles — 10 min chaque candidat (5 min présentation + 5 min Q&R avec le jury)', 'ar' => 'جلسات عروض فردية — 10 دقائق لكل مرشح (5 عرض + 5 أسئلة)'], 'speakers' => []],
                ['time' => '17:30', 'title' => ['en' => 'Jury deliberation (break for participants)', 'fr' => 'Délibération du jury (pause pour les participants)', 'ar' => 'مداولة لجنة التحكيم (استراحة للمشاركين)'], 'speakers' => []],
                ['time' => '18:00', 'title' => ['en' => 'Results announcement & closing remarks', 'fr' => 'Annonce des résultats & mot de clôture', 'ar' => 'إعلان النتائج وكلمة الختام'], 'speakers' => []],
                ['time' => '18:30', 'title' => ['en' => 'Closing cocktail', 'fr' => 'Cocktail de clôture', 'ar' => 'كوكتيل الختام'], 'speakers' => []],
            ],
            'jury' => [
                ['name' => 'Reda Taleb'],
                ['name' => 'Youssef Ksiyer'],
                ['name' => 'Ali Boujena'],
                ['name' => 'Hassan Rouissi'],
                ['name' => 'Khadija Boujanoui'],
                ['name' => 'Samya El Kyas'],
            ],
        ],
        'days' => [
            [
                'label' => ['en' => 'Wednesday 10 September', 'fr' => 'Mercredi 10 septembre', 'ar' => 'الأربعاء 10 سبتمبر'],
                'sessions' => [
                    ['time' => '14:00', 'title' => ['en' => 'Departure to Marrakech', 'fr' => 'Départ vers Marrakech', 'ar' => 'المغادرة نحو مراكش'], 'speakers' => []],
                    ['time' => '16:30', 'title' => ['en' => 'Arrival & check-in', 'fr' => 'Arrivée et check-in', 'ar' => 'الوصول وتسجيل الدخول'], 'speakers' => []],
                    ['time' => '21:00', 'title' => ['en' => 'Welcome, Tilila & Tililab presentations — dinner + musical entertainment', 'fr' => 'Accueil et mot de bienvenue, présentation TILILA, présentation du Bootcamp TILILAB et des intervenants — Dîner + animation musicale', 'ar' => 'ترحيب وعرض تيليلا وتيليلاب — عشاء وترفيه موسيقي'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Thursday 11 September', 'fr' => 'Jeudi 11 septembre', 'ar' => 'الخميس 11 سبتمبر'],
                'sessions' => [
                    ['time' => '08:00', 'title' => ['en' => 'Breakfast', 'fr' => 'Petit-Déjeuner', 'ar' => 'فطور'], 'speakers' => []],
                    ['time' => '09:00', 'title' => ['en' => 'Opening sequence (framework & day objectives)', 'fr' => 'Séquence d\'ouverture (Cadre, objectifs du jour)', 'ar' => 'افتتاحية (الإطار وأهداف اليوم)'], 'speakers' => [['name' => 'Ali Boujena', 'role' => ['en' => 'CEO, UACC', 'fr' => 'Directeur Général de l\'UACC', 'ar' => 'المدير العام UACC']]]],
                    ['time' => '09:00', 'title' => ['en' => 'Launch conference: The role of advertising in civic engagement', 'fr' => 'Conférence de lancement : Le rôle de la publicité dans l\'engagement citoyen', 'ar' => 'مؤتمر افتتاحي: دور الإعلان في المشاركة المدنية'], 'speakers' => [['name' => 'Comité Parité et Diversité 2M', 'role' => ['en' => '2M Parity & Diversity Committee', 'fr' => 'Comité Parité et Diversité 2M', 'ar' => 'لجنة المساواة والتنوع 2M']]]],
                    ['time' => '09:30', 'title' => ['en' => 'Inspiring keynote', 'fr' => 'Keynote inspirante', 'ar' => 'كلمة ملهمة'], 'speakers' => [['name' => 'Tarik Haddi', 'role' => ['en' => 'Author & entrepreneur', 'fr' => 'Auteur et chef d\'entreprise', 'ar' => 'مؤلف ورائد أعمال']]]],
                    ['time' => '10:15', 'title' => ['en' => 'Coffee break (15 min)', 'fr' => 'Pause-café (15 min)', 'ar' => 'استراحة قهوة (15 دقيقة)'], 'speakers' => []],
                    ['time' => '10:30', 'title' => ['en' => 'Workshop: Presentation of volunteering values', 'fr' => 'Workshop : Présentation des valeurs du bénévolat', 'ar' => 'ورشة: عرض قيم التطوع'], 'speakers' => [['name' => 'Majda Fikri', 'role' => ['en' => 'Communications officer', 'fr' => 'Chargée de la communication', 'ar' => 'مسؤولة الاتصال']]]],
                    ['time' => '11:30', 'title' => ['en' => 'Case study: JAWJAB', 'fr' => 'Étude de cas — JAWJAB', 'ar' => 'دراسة حالة JAWJAB'], 'speakers' => [['name' => 'Younes Lazrak', 'role' => ['en' => 'CEO, JAWJAB', 'fr' => 'Directeur Général JAWJAB', 'ar' => 'المدير العام JAWJAB']]]],
                    ['time' => '12:00', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Digital case study', 'fr' => 'Étude de cas digitale', 'ar' => 'دراسة حالة رقمية'], 'speakers' => [['name' => 'Younes Lazrak', 'role' => ['en' => 'CEO', 'fr' => 'Directeur Général', 'ar' => 'المدير العام']]]],
                    ['time' => '14:30', 'title' => ['en' => 'Case study: Royal Air Maroc', 'fr' => 'Étude de cas — Royal Air Maroc', 'ar' => 'دراسة حالة الخطوط الملكية المغربية'], 'speakers' => [['name' => 'Sanaa Tazi', 'role' => ['en' => 'Vice President of Marketing, RAM', 'fr' => 'Vice President of Marketing, Royal Air Maroc', 'ar' => 'نائبة رئيس التسويق RAM']]]],
                    ['time' => '15:00', 'title' => ['en' => 'Professional round table', 'fr' => 'Table ronde professionnelle', 'ar' => 'طاولة مستديرة مهنية'], 'speakers' => [['name' => 'Hassan Rouissi', 'role' => ['en' => 'The Next Click', 'fr' => 'The Next Click', 'ar' => 'The Next Click']], ['name' => 'Samya El Kyas', 'role' => ['en' => 'GAM', 'fr' => 'GAM', 'ar' => 'GAM']], ['name' => 'Youssef Ksiyer', 'role' => ['en' => 'Jooj Media', 'fr' => 'Jooj media', 'ar' => 'Jooj media']]]],
                    ['time' => '16:00', 'title' => ['en' => 'Brief launch', 'fr' => 'Lancement du brief par Youssef Ksyer', 'ar' => 'إطلاق البريف'], 'speakers' => [['name' => 'Youssef Ksiyer', 'role' => ['en' => 'Jooj Media', 'fr' => 'Jooj media', 'ar' => 'Jooj media']]]],
                    ['time' => '16:30', 'title' => ['en' => 'Immersive workshop', 'fr' => 'Atelier immersif avec Gilles Terver, Co-fondateur de Tswera', 'ar' => 'ورشة غامرة'], 'speakers' => [['name' => 'Gilles Terver', 'role' => ['en' => 'Co-founder, Tswera', 'fr' => 'Co-fondateur de Tswera', 'ar' => 'المؤسس المشارك Tswera']]]],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner + musical entertainment', 'fr' => 'Dîner + animation musicale', 'ar' => 'عشاء وترفيه موسيقي'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Friday 12 September', 'fr' => 'Vendredi 12 septembre', 'ar' => 'الجمعة 12 سبتمبر'],
                'sessions' => [
                    ['time' => '09:00', 'title' => ['en' => 'Group coaching', 'fr' => 'Coaching collectif', 'ar' => 'تدريب جماعي'], 'speakers' => []],
                    ['time' => '09:30', 'title' => ['en' => 'Individual free work session', 'fr' => 'Session de travail libre individuelle', 'ar' => 'جلسة عمل حرة فردية'], 'speakers' => []],
                    ['time' => '10:00', 'title' => ['en' => 'Welcome for AMESIP youth & association presentation', 'fr' => 'Accueil des jeunes de l\'association AMESIP — Présentation de l\'association AMESIP', 'ar' => 'استقبال شباب جمعية AMESIP وعرض الجمعية'], 'speakers' => []],
                    ['time' => '10:00', 'title' => ['en' => 'Structured workshop', 'fr' => 'Atelier structuré', 'ar' => 'ورشة منظمة'], 'speakers' => []],
                    ['time' => '12:00', 'title' => ['en' => 'Debrief — research firm intervention', 'fr' => 'Débrief — Intervention d\'un cabinet d\'études', 'ar' => 'تقييم — تدخل مكتب دراسات'], 'speakers' => []],
                    ['time' => '12:30', 'title' => ['en' => 'Lunch break', 'fr' => 'Pause-déjeuner', 'ar' => 'استراحة غداء'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Masterclass: Content creation challenges', 'fr' => 'Masterclass : Les enjeux de la création de contenu', 'ar' => 'ماستركلاس: تحديات إنشاء المحتوى'], 'speakers' => [['name' => 'Simo Sedraty', 'role' => ['en' => 'Content creator', 'fr' => 'Créateur de contenu', 'ar' => 'صانع محتوى']]]],
                    ['time' => '17:00', 'title' => ['en' => 'Closing intervention', 'fr' => 'Intervention de clôture', 'ar' => 'كلمة ختام'], 'speakers' => [['name' => 'Siham Malek', 'role' => ['en' => 'CEO, Integrate Consulting', 'fr' => 'CEO Integrate Consulting', 'ar' => 'المديرة العامة Integrate Consulting']]]],
                    ['time' => '21:00', 'title' => ['en' => 'Dinner + musical entertainment', 'fr' => 'Dîner + animation musicale', 'ar' => 'عشاء وترفيه موسيقي'], 'speakers' => []],
                ],
            ],
            [
                'label' => ['en' => 'Saturday 13 September', 'fr' => 'Samedi 13 septembre', 'ar' => 'السبت 13 سبتمبر'],
                'sessions' => [
                    ['time' => '09:00', 'title' => ['en' => 'Final participant pitches (15 min max per pitch)', 'fr' => 'Pitchs finaux des participants (15 min maximum par pitch)', 'ar' => 'العروض النهائية للمشاركين (15 دقيقة كحد أقصى)'], 'speakers' => []],
                    ['time' => '12:00', 'title' => ['en' => 'Certificate ceremony', 'fr' => 'Remise des certificats', 'ar' => 'توزيع الشهادات'], 'speakers' => []],
                    ['time' => '14:00', 'title' => ['en' => 'Technical coaching session (production team)', 'fr' => 'Séance d\'encadrement technique (Équipe production)', 'ar' => 'جلسة إشراف تقني (فريق الإنتاج)'], 'speakers' => []],
                    ['time' => '', 'title' => ['en' => 'Lunch', 'fr' => 'Déjeuner', 'ar' => 'غداء'], 'speakers' => []],
                    ['time' => '', 'title' => ['en' => 'Departure to Casablanca', 'fr' => 'Départ vers Casablanca', 'ar' => 'المغادرة نحو الدار البيضاء'], 'speakers' => []],
                ],
            ],
        ],
    ],
];
