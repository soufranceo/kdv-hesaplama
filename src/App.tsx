import React, { useState } from 'react';
import { Download, Upload, Trash2, Eye, Mail, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExperienceItem from './components/ExperienceItem';
import SkillsSection from './components/SkillsSection';

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Language {
  language: string;
  level: string;
}

interface CVData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  about: string;
  experiences: Experience[];
  education: string;
  languages: Language[];
  skills: string[];
  image: string;
}

const initialData: CVData = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  about: '',
  experiences: [],
  education: '',
  languages: [{ language: '', level: '' }],
  skills: [''],
  image: '',
};

function App() {
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
      description: '',
    };
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...cvData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setCvData(prev => ({ ...prev, languages: newLanguages }));
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', level: '' }],
    }));
  };

  const removeLanguage = (index: number) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setCvData(prev => ({ ...prev, skills: newSkills }));
  };

  const downloadPDF = () => {
    const element = document.getElementById('cv-preview');
    const opt = {
      margin: 1,
      filename: 'cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setCvData(initialData);
      toast.info('Bilgileriniz otomatik silinmiştir. Düzeltme yapmak için bilgileri yeniden girmeniz gerekmektedir.');
    });
  };

  const clearForm = () => {
    setCvData(initialData);
    toast.info('Tüm bilgiler silindi!');
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
    toast.info(showPreview ? 'Düzenleme moduna geçildi' : 'Önizleme moduna geçildi');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      <ToastContainer position="top-right" theme="light" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
          Modern CV Oluşturucu
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg ${showPreview ? 'lg:hidden' : ''}`}>
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  {cvData.image ? (
                    <img
                      src={cvData.image}
                      alt="Profil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-300" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full cursor-pointer hover:opacity-90 transition">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Ad Soyad', name: 'fullName', type: 'text' },
                  { label: 'Ünvan', name: 'title', type: 'text' },
                  { label: 'E-posta', name: 'email', type: 'email' },
                  { label: 'Telefon', name: 'phone', type: 'tel' },
                ].map((field) => (
                  <div key={field.name} className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={cvData[field.name as keyof CVData] as string}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                ))}

                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hakkımda
                  </label>
                  <textarea
                    name="about"
                    value={cvData.about}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Deneyimler</h3>
                  <div className="space-y-4">
                    {cvData.experiences.map((exp, index) => (
                      <ExperienceItem
                        key={exp.id}
                        experience={exp}
                        onDelete={removeExperience}
                        onAdd={addExperience}
                        onChange={handleExperienceChange}
                        isLast={index === cvData.experiences.length - 1}
                      />
                    ))}
                    {cvData.experiences.length === 0 && (
                      <button
                        onClick={addExperience}
                        className="w-full py-2 text-sm text-blue-500 hover:text-blue-600 transition-colors border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        + İlk Deneyimi Ekle
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Eğitim
                  </label>
                  <textarea
                    name="education"
                    value={cvData.education}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <SkillsSection
                  languages={cvData.languages}
                  skills={cvData.skills}
                  onLanguageChange={handleLanguageChange}
                  onAddLanguage={addLanguage}
                  onRemoveLanguage={removeLanguage}
                  onSkillsChange={handleSkillsChange}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={downloadPDF}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <Download className="w-4 h-4" /> PDF İndir
              </button>
              <button
                onClick={togglePreview}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <Eye className="w-4 h-4" /> Önizleme
              </button>
              <button
                onClick={clearForm}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <Trash2 className="w-4 h-4" /> Temizle
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`relative ${!showPreview ? 'lg:block hidden' : ''}`}>
            {/* Preview Controls for Desktop */}
            <div className="absolute -top-16 right-0 flex gap-4">
              {showPreview && (
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Düzenlemeye Dön
                </button>
              )}
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <Download className="w-4 h-4" /> CV'yi İndir
              </button>
            </div>

            {/* CV Preview */}
            <div id="cv-preview" className="bg-white p-8 rounded-xl shadow-lg">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-green-50 p-8">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-green-500 opacity-20"></div>
                
                <div className="relative z-10 grid grid-cols-3 gap-8">
                  <div className="col-span-1">
                    {cvData.image && (
                      <img
                        src={cvData.image}
                        alt="Profil"
                        className="w-full aspect-square object-cover rounded-xl shadow-lg mb-6"
                      />
                    )}
                    <div className="space-y-6">
                      <section className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">İletişim</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          {cvData.email && <p>{cvData.email}</p>}
                          {cvData.phone && <p>{cvData.phone}</p>}
                        </div>
                      </section>

                      {cvData.languages.length > 0 && cvData.languages[0].language && (
                        <section className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Yabancı Dil</h3>
                          <div className="space-y-2">
                            {cvData.languages.map((lang, index) => (
                              lang.language && (
                                <div key={index} className="text-gray-600">
                                  <span className="font-medium">{lang.language}</span>
                                  {lang.level && <span className="text-sm text-gray-500"> - {lang.level}</span>}
                                </div>
                              )
                            ))}
                          </div>
                        </section>
                      )}

                      {cvData.skills.length > 0 && cvData.skills[0] && (
                        <section className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Beceriler</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {cvData.skills.map((skill, index) => (
                              skill && (
                                <div key={index} className="text-sm text-gray-600 bg-white/50 rounded-lg px-3 py-1">
                                  {skill}
                                </div>
                              )
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 space-y-6">
                    <div className="mb-8">
                      <h2 className="text-4xl font-bold text-gray-800 mb-2">{cvData.fullName || 'Ad Soyad'}</h2>
                      <p className="text-xl text-blue-600">{cvData.title || 'Ünvan'}</p>
                    </div>

                    {cvData.about && (
                      <section className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakkımda</h3>
                        <p className="text-gray-600">{cvData.about}</p>
                      </section>
                    )}

                    {cvData.experiences.length > 0 && (
                      <section className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Deneyim</h3>
                        <div className="space-y-4">
                          {cvData.experiences.map((exp) => (
                            exp.company && (
                              <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                                <h4 className="font-semibold text-gray-800">{exp.company}</h4>
                                <p className="text-blue-600">{exp.position}</p>
                                <p className="text-sm text-gray-500">{exp.period}</p>
                                <p className="text-gray-600 mt-2">{exp.description}</p>
                              </div>
                            )
                          ))}
                        </div>
                      </section>
                    )}

                    {cvData.education && (
                      <section className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Eğitim</h3>
                        <p className="text-gray-600 whitespace-pre-line">{cvData.education}</p>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 py-6 border-t border-gray-100">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Mehmet Akgül. Tüm hakları saklıdır.
            </p>
            <a
              href="mailto:souffrance.tk@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:opacity-90 transition"
            >
              <Mail className="w-4 h-4" />
              İletişim
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;