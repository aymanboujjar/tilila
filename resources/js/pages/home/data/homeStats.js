import {
    Award,
    Clapperboard,
    GraduationCap,
    Megaphone,
    Star,
    Trophy,
    Users,
} from 'lucide-react';

export const TILILA_HOME_STATS = [
    {
        icon: Trophy,
        value: '7',
        labelFr: 'éditions',
        labelEn: 'editions',
        labelAr: 'دورات',
    },
    {
        icon: Megaphone,
        value: '+250',
        labelFr: 'campagnes candidates',
        labelEn: 'candidate campaigns',
        labelAr: 'حملة مرشحة',
        
    },
    {
        icon: Star,
        value: '+50',
        labelFr: 'campagnes shortlistées',
        labelEn: 'shortlisted campaigns',
        labelAr: 'حملة في القائمة القصيرة',
        
    },
    {
        icon: Award,
        value: '13',
        labelFr: 'campagnes primées',
        labelEn: 'awarded campaigns',
        labelAr: 'حملة فائزة',
    },
    {
        icon: Users,
        value: '26',
        labelFr: 'membres de jury',
        labelEn: 'jury members',
        labelAr: 'عضوًا في لجنة التحكيم',
    },
    {
        icon: Trophy,
        value: '7',
        labelFr: 'Hommages Tilila décernés',
        labelEn: 'Hommage Tilila awards',
        labelAr: 'تكريمات تيليلا',
    },
];

export const TILILAB_HOME_STATS = [
    {
        icon: Trophy,
        value: '5',
        labelFr: 'éditions',
        labelEn: 'editions',
        labelAr: 'دورات',
    },
    {
        icon: Users,
        value: 'Plusieurs dizaines',
        valueSize: 'sm',
        labelFr: 'de jeunes créateurs accompagnés',
        labelEn: 'young creators supported',
        labelAr: 'مبدع شاب مرافق',
    },
    {
        icon: Clapperboard,
        value: '30+',
        labelFr: 'projets produits',
        labelEn: 'projects produced',
        labelAr: 'مشروع منتج',
        
    },
    {
        icon: GraduationCap,
        value: 'Des centaines',
        valueSize: 'sm',
        labelFr: "d'heures de formation et de mentorat",
        labelEn: 'hours of training and mentoring',
        labelAr: 'ساعة تدريب وإرشاد',
    },
];
