import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createUpdateProfile } from '@/api/profile.api';
import { ProfileData } from '@/types/profile';
import { toast } from '@/hooks/use-toast';
import useAuthStore from '@/store/useAuthStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Check, ChevronRight, ChevronLeft, User, MapPin, Briefcase, Heart } from 'lucide-react';

const ProfileCreationStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData>({});
  const navigate = useNavigate();
  const { updateUser } = useAuthStore();

  const createProfileMutation = useMutation({
    mutationFn: createUpdateProfile,
    onSuccess: () => {
      updateUser({ profileComplete: true });
      toast({
        title: 'Profile Created!',
        description: 'Your profile has been created successfully',
      });
      navigate('/profiles');
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Failed to create profile',
        variant: 'destructive',
      });
    },
  });

  const steps = [
    { number: 1, title: 'Basic Info', icon: User },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Career', icon: Briefcase },
    { number: 4, title: 'About You', icon: Heart },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      createProfileMutation.mutate(formData);
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
        return formData.name && formData.dateOfBirth && formData.gender;
      case 2:
        return formData.city && formData.state;
      case 3:
        return formData.education && formData.occupation;
      case 4:
        return formData.bio;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        currentStep > step.number
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                          : currentStep === step.number
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white ring-4 ring-rose-200'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-xs mt-2 font-medium text-gray-600">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        currentStep > step.number ? 'bg-gradient-to-r from-rose-500 to-pink-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {steps[currentStep - 1].title}
          </h2>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => updateFormData('gender', value)}
                >
                  <SelectTrigger>
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
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  placeholder="e.g., 5'8\""
                  value={formData.height || ''}
                  onChange={(e) => updateFormData('height', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => updateFormData('maritalStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never_married">Never Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Location & Background */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  value={formData.city || ''}
                  onChange={(e) => updateFormData('city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  value={formData.state || ''}
                  onChange={(e) => updateFormData('state', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Enter your country"
                  value={formData.country || ''}
                  onChange={(e) => updateFormData('country', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  placeholder="Enter your religion"
                  value={formData.religion || ''}
                  onChange={(e) => updateFormData('religion', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="caste">Caste</Label>
                <Input
                  id="caste"
                  placeholder="Enter your caste"
                  value={formData.caste || ''}
                  onChange={(e) => updateFormData('caste', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="motherTongue">Mother Tongue</Label>
                <Input
                  id="motherTongue"
                  placeholder="Enter your mother tongue"
                  value={formData.motherTongue || ''}
                  onChange={(e) => updateFormData('motherTongue', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Education & Career */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="education">Education *</Label>
                <Input
                  id="education"
                  placeholder="e.g., B.Tech, MBA"
                  value={formData.education || ''}
                  onChange={(e) => updateFormData('education', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="occupation">Occupation *</Label>
                <Input
                  id="occupation"
                  placeholder="e.g., Software Engineer"
                  value={formData.occupation || ''}
                  onChange={(e) => updateFormData('occupation', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employedIn">Employed In</Label>
                <Select
                  value={formData.employedIn}
                  onValueChange={(value) => updateFormData('employedIn', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Sector</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="self_employed">Self Employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Select
                  value={formData.annualIncome}
                  onValueChange={(value) => updateFormData('annualIncome', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">0 - 3 Lakhs</SelectItem>
                    <SelectItem value="3-5">3 - 5 Lakhs</SelectItem>
                    <SelectItem value="5-7">5 - 7 Lakhs</SelectItem>
                    <SelectItem value="7-10">7 - 10 Lakhs</SelectItem>
                    <SelectItem value="10+">10+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: About & Preferences */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">About You *</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  rows={5}
                  value={formData.bio || ''}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lookingFor">Looking For</Label>
                <Textarea
                  id="lookingFor"
                  placeholder="Describe your ideal partner..."
                  rows={3}
                  value={formData.lookingFor || ''}
                  onChange={(e) => updateFormData('lookingFor', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="familyType">Family Type</Label>
                <Select
                  value={formData.familyType}
                  onValueChange={(value) => updateFormData('familyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select family type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joint">Joint Family</SelectItem>
                    <SelectItem value="nuclear">Nuclear Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="familyValues">Family Values</Label>
                <Select
                  value={formData.familyValues}
                  onValueChange={(value) => updateFormData('familyValues', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select family values" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="liberal">Liberal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || createProfileMutation.isPending}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || createProfileMutation.isPending}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
            >
              {currentStep === 4 ? (
                createProfileMutation.isPending ? (
                  'Creating Profile...'
                ) : (
                  'Complete Profile'
                )
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCreationStepper;
