import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import useAuthStore from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronRight, ChevronLeft, User, MapPin, Briefcase, Heart } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const ProfileCreationStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    // Step 1
    name: '',
    date_of_birth: '',
    gender: '',
    profile_by: 'self',
    marital_status: '',
    time_of_birth: '',
    place_of_birth: '',
    
    // Step 2
    bio: '',
    about: '',
    mother_tongue: '',
    known_languages: '',
    height: '',
    weight: '',
    body_type: '',
    complexion: '',
    eye_color: '',
    hair_color: '',
    disability: 'normal',
    blood_group: '',
    
    // Step 3
    current_city: '',
    hometown: '',
    state_id: '',
    country_id: 1,
    
    // Step 4
    education_id: '',
    occupation_id: '',
    income: ''
  });

  const navigate = useNavigate();
  const { updateUser } = useAuthStore();

  const steps = [
    { number: 1, title: 'Basic Info', icon: User },
    { number: 2, title: 'Physical & Bio', icon: Heart },
    { number: 3, title: 'Location', icon: MapPin },
    { number: 4, title: 'Career', icon: Briefcase },
  ];

  // API mutations for each step
  const step1Mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${API_URL}/api/profile/create/`, data);
      return response.data;
    },
  });

  const step2Mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${API_URL}/api/profile/basic-info`, data);
      return response.data;
    },
  });

  const step3Mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${API_URL}/api/profile/location`, data);
      return response.data;
    },
  });

  const step4Mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${API_URL}/api/profile/education-occupation`, data);
      return response.data;
    },
  });

  const handleNext = async () => {
    if (currentStep < 4) {
      // Submit current step data
      try {
        if (currentStep === 1) {
          await step1Mutation.mutateAsync({
            name: formData.name,
            date_of_birth: formData.date_of_birth,
            gender: formData.gender,
            profile_by: formData.profile_by,
            marital_status: formData.marital_status,
            password: '12345678', // Temp password
            password_confirmation: '12345678',
            time_of_birth: formData.time_of_birth,
            place_of_birth: formData.place_of_birth
          });
          toast({ title: 'Success', description: 'Basic info saved!' });
        } else if (currentStep === 2) {
          await step2Mutation.mutateAsync({
            bio: formData.bio,
            about: formData.about,
            mother_tongue: formData.mother_tongue,
            known_languages: formData.known_languages,
            height: parseFloat(formData.height) || 0,
            weight: parseFloat(formData.weight) || 0,
            body_type: formData.body_type,
            complexion: formData.complexion,
            eye_color: formData.eye_color,
            hair_color: formData.hair_color,
            disability: formData.disability,
            blood_group: formData.blood_group
          });
          toast({ title: 'Success', description: 'Physical details saved!' });
        } else if (currentStep === 3) {
          await step3Mutation.mutateAsync({
            current_city: formData.current_city,
            hometown: formData.hometown,
            state_id: parseInt(formData.state_id) || 28,
            country_id: formData.country_id
          });
          toast({ title: 'Success', description: 'Location saved!' });
        }
        setCurrentStep(currentStep + 1);
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to save data',
          variant: 'destructive',
        });
      }
    } else {
      // Final step
      try {
        await step4Mutation.mutateAsync({
          education_id: parseInt(formData.education_id) || 3,
          occupation_id: parseInt(formData.occupation_id) || 11,
          income: formData.income
        });
        
        updateUser({ profileComplete: true });
        toast({
          title: 'Profile Complete!',
          description: 'Your profile has been created successfully',
        });
        navigate('/profiles');
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Failed to complete profile',
          variant: 'destructive',
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.date_of_birth && formData.gender && formData.marital_status;
      case 2:
        return formData.bio && formData.height;
      case 3:
        return formData.current_city && formData.hometown;
      case 4:
        return formData.income;
      default:
        return false;
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #fff1f2, #fce7f3, #ffedd5)',
        padding: '32px 16px',
      }}
    >
      <div style={{ maxWidth: '768px', margin: '0 auto' }}>
        {/* Progress Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.number}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: currentStep >= step.number
                          ? 'linear-gradient(to right, #f43f5e, #ec4899)'
                          : '#e5e7eb',
                        color: currentStep >= step.number ? 'white' : '#9ca3af',
                        boxShadow: currentStep === step.number ? '0 0 0 4px rgba(244, 63, 94, 0.2)' : 'none',
                        transition: 'all 0.3s'
                      }}
                    >
                      {currentStep > step.number ? (
                        <Check style={{ height: '24px', width: '24px' }} />
                      ) : (
                        <Icon style={{ height: '24px', width: '24px' }} />
                      )}
                    </div>
                    <span style={{ fontSize: '12px', marginTop: '8px', fontWeight: '500', color: '#4b5563' }}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        margin: '0 8px',
                        borderRadius: '2px',
                        background: currentStep > step.number
                          ? 'linear-gradient(to right, #f43f5e, #ec4899)'
                          : '#e5e7eb',
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(currentStep / 4) * 100}%`,
                background: 'linear-gradient(to right, #f43f5e, #ec4899)',
                transition: 'width 0.3s'
              }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div
          style={{
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: '16px',
            backgroundColor: 'white',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>
            {steps[currentStep - 1].title}
          </h2>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth">Date of Birth *</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth || ''}
                  onChange={(e) => updateFormData('date_of_birth', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => updateFormData('gender', value)}
                >
                  <SelectTrigger style={{ marginTop: '8px' }}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="marital_status">Marital Status *</Label>
                <Select
                  value={formData.marital_status}
                  onValueChange={(value) => updateFormData('marital_status', value)}
                >
                  <SelectTrigger style={{ marginTop: '8px' }}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unmarried">Unmarried</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time_of_birth">Time of Birth</Label>
                <Input
                  id="time_of_birth"
                  type="time"
                  value={formData.time_of_birth || ''}
                  onChange={(e) => updateFormData('time_of_birth', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="place_of_birth">Place of Birth</Label>
                <Input
                  id="place_of_birth"
                  placeholder="e.g., Badasi Grant"
                  value={formData.place_of_birth || ''}
                  onChange={(e) => updateFormData('place_of_birth', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Physical & Bio */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief intro about yourself"
                  value={formData.bio || ''}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  style={{ marginTop: '8px' }}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  placeholder="Tell more about yourself"
                  value={formData.about || ''}
                  onChange={(e) => updateFormData('about', e.target.value)}
                  style={{ marginTop: '8px' }}
                  rows={4}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <Label htmlFor="height">Height (ft) *</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="5.9"
                    value={formData.height || ''}
                    onChange={(e) => updateFormData('height', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="69"
                    value={formData.weight || ''}
                    onChange={(e) => updateFormData('weight', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="mother_tongue">Mother Tongue</Label>
                <Input
                  id="mother_tongue"
                  placeholder="Hindi"
                  value={formData.mother_tongue || ''}
                  onChange={(e) => updateFormData('mother_tongue', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="known_languages">Known Languages</Label>
                <Input
                  id="known_languages"
                  placeholder="Hindi, English, Spanish"
                  value={formData.known_languages || ''}
                  onChange={(e) => updateFormData('known_languages', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <Label htmlFor="body_type">Body Type</Label>
                  <Select
                    value={formData.body_type}
                    onValueChange={(value) => updateFormData('body_type', value)}
                  >
                    <SelectTrigger style={{ marginTop: '8px' }}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slim">Slim</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="athletic">Athletic</SelectItem>
                      <SelectItem value="heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="complexion">Complexion</Label>
                  <Select
                    value={formData.complexion}
                    onValueChange={(value) => updateFormData('complexion', value)}
                  >
                    <SelectTrigger style={{ marginTop: '8px' }}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="wheatish">Wheatish</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <Label htmlFor="eye_color">Eye Color</Label>
                  <Input
                    id="eye_color"
                    placeholder="Black"
                    value={formData.eye_color || ''}
                    onChange={(e) => updateFormData('eye_color', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </div>
                <div>
                  <Label htmlFor="hair_color">Hair Color</Label>
                  <Input
                    id="hair_color"
                    placeholder="Black"
                    value={formData.hair_color || ''}
                    onChange={(e) => updateFormData('hair_color', e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="blood_group">Blood Group</Label>
                <Input
                  id="blood_group"
                  placeholder="B-"
                  value={formData.blood_group || ''}
                  onChange={(e) => updateFormData('blood_group', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <Label htmlFor="current_city">Current City *</Label>
                <Input
                  id="current_city"
                  placeholder="Dehradun"
                  value={formData.current_city || ''}
                  onChange={(e) => updateFormData('current_city', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="hometown">Hometown *</Label>
                <Input
                  id="hometown"
                  placeholder="Jolly Grant"
                  value={formData.hometown || ''}
                  onChange={(e) => updateFormData('hometown', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="state_id">State ID</Label>
                <Input
                  id="state_id"
                  type="number"
                  placeholder="28"
                  value={formData.state_id || ''}
                  onChange={(e) => updateFormData('state_id', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
            </div>
          )}

          {/* Step 4: Career */}
          {currentStep === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <Label htmlFor="education_id">Education Level</Label>
                <Input
                  id="education_id"
                  type="number"
                  placeholder="3"
                  value={formData.education_id || ''}
                  onChange={(e) => updateFormData('education_id', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="occupation_id">Occupation</Label>
                <Input
                  id="occupation_id"
                  type="number"
                  placeholder="11"
                  value={formData.occupation_id || ''}
                  onChange={(e) => updateFormData('occupation_id', e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div>
                <Label htmlFor="income">Income Range *</Label>
                <Select
                  value={formData.income}
                  onValueChange={(value) => updateFormData('income', value)}
                >
                  <SelectTrigger style={{ marginTop: '8px' }}>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3L">0-3L</SelectItem>
                    <SelectItem value="3L-5L">3L-5L</SelectItem>
                    <SelectItem value="5L-10L">5L-10L</SelectItem>
                    <SelectItem value="10L-20L">10L-20L</SelectItem>
                    <SelectItem value="20L+">20L+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ChevronLeft style={{ height: '16px', width: '16px' }} />
                Back
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || step1Mutation.isPending || step2Mutation.isPending || step3Mutation.isPending || step4Mutation.isPending}
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(to right, #f43f5e, #ec4899)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: isStepValid() ? 'pointer' : 'not-allowed',
                opacity: isStepValid() ? 1 : 0.5
              }}
            >
              {currentStep === 4 ? 'Complete Profile' : 'Next'}
              {currentStep < 4 && <ChevronRight style={{ height: '16px', width: '16px' }} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationStepper;
