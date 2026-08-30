export interface Review {
  id: string;
  hospitalId: string;
  userName: string;
  userCity: string;
  treatment: string;
  treatmentHi: string;
  rating: number; // 1 to 5
  date: string;
  verifiedBeneficiary: boolean;
  comment: string;
  commentHi: string;
  ayushmanMitraRating: number;
  cashlessExperience: '100% Cashless' | 'Smooth Approval' | 'Fast Admission';
}

export const initialReviews: Record<string, Review[]> = {
  default: [
    {
      id: 'rev-1',
      hospitalId: 'default',
      userName: 'Rajeshwar Sharma',
      userCity: 'Durg, Chhattisgarh',
      treatment: 'Total Knee Replacement Surgery',
      treatmentHi: 'घुटना प्रत्यारोपण सर्जरी (Knee Replacement)',
      rating: 5,
      date: '14 August 2026',
      verifiedBeneficiary: true,
      comment: 'Completely cashless surgery under Ayushman Bharat! The Ayushman Mitra desk at the entrance verified our card within 15 minutes. No extra money was demanded for medicines or implants.',
      commentHi: 'आयुष्मान भारत के तहत बिल्कुल कैशलेस ऑपरेशन हुआ! मुख्य द्वार पर स्थित आयुष्मान मित्र ने 15 मिनट में कार्ड सत्यापित कर दिया। दवाइयों या इम्प्लांट के लिए कोई अतिरिक्त शुल्क नहीं लिया गया।',
      ayushmanMitraRating: 5,
      cashlessExperience: '100% Cashless'
    },
    {
      id: 'rev-2',
      hospitalId: 'default',
      userName: 'Sunita Devi Patel',
      userCity: 'Bhilai / Durg',
      treatment: 'Cataract Eye Surgery (Phaco)',
      treatmentHi: 'मोतियाबिंद का फेको ऑपरेशन',
      rating: 5,
      date: '28 July 2026',
      verifiedBeneficiary: true,
      comment: 'My mother got both eyes operated under PM-JAY here. Doctor was very humble and post-surgery eye drops were provided free of cost.',
      commentHi: 'मेरी माताजी की दोनों आँखों का ऑपरेशन पीएम-जय के तहत हुआ। डॉक्टर बहुत कुशल और विनम्र थे और ऑपरेशन के बाद दवाइयां मुफ्त दी गईं।',
      ayushmanMitraRating: 5,
      cashlessExperience: 'Smooth Approval'
    },
    {
      id: 'rev-3',
      hospitalId: 'default',
      userName: 'Manish Sahu',
      userCity: 'Raipur / Durg',
      treatment: 'Gallbladder Laparoscopic Surgery',
      treatmentHi: 'पित्ताशय की दूरबीन वाली सर्जरी (Laparoscopy)',
      rating: 4,
      date: '05 July 2026',
      verifiedBeneficiary: true,
      comment: 'Admission was quick through the PM-JAY dedicated counter. Ward was clean and discharge summary was handed over with all digital records.',
      commentHi: 'पीएम-जय समर्पित काउंटर के जरिए दाखिला तुरंत हो गया। वार्ड साफ-सुथरा था और डिस्चार्ज समय पर बिना किसी परेशानी के हो गया।',
      ayushmanMitraRating: 4,
      cashlessExperience: 'Fast Admission'
    },
    {
      id: 'rev-4',
      hospitalId: 'default',
      userName: 'Kavita Verma',
      userCity: 'Durg',
      treatment: 'Maternity & Normal Delivery Care',
      treatmentHi: 'मातृत्व एवं सुरक्षित प्रसव सेवा',
      rating: 5,
      date: '19 June 2026',
      verifiedBeneficiary: true,
      comment: 'Excellent care in maternity ward. All lab tests, sonography, and newborn checkup covered 100% cashless under Ayushman Card.',
      commentHi: 'मातृ विंग में बेहतरीन देखभाल मिली। सभी रक्त जांच, सोनोग्राफी और नवजात की जांच आयुष्मान कार्ड के तहत 100% मुफ्त हुई।',
      ayushmanMitraRating: 5,
      cashlessExperience: '100% Cashless'
    }
  ]
};
