import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Loader2,
  Mail,
  Plus,
  User,
  Phone,
  MapPin,
  Camera,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

interface ProfileData {
  fullname: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
}

interface FormErrors {
  [key: string]: string;
}

const Profile = () => {
  const { user, updateProfile, loading } = useUserStore();
  const [profileData, setProfileData] = useState<ProfileData>({
    fullname: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);

  // Initialize profile data from user store
  useEffect(() => {
    if (user) {
      setProfileData({
        fullname: user.fullname || "",
        email: user.email || "",
        contact: user.contact?.toString() || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        profilePicture: user.profilePicture || "",
      });
      setSelectedProfilePicture(user.profilePicture || "");
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!profileData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    } else if (profileData.fullname.length < 2) {
      newErrors.fullname = "Full name must be at least 2 characters";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      profileData.contact &&
      !/^\d{10,15}$/.test(profileData.contact.replace(/\s+/g, ""))
    ) {
      newErrors.contact = "Please enter a valid phone number (10-15 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prev) => ({ ...prev, profilePicture: result }));
        setHasChanges(true);
        setIsImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const updateData = {
        ...profileData,
        contact: profileData.contact
          ? parseInt(profileData.contact)
          : undefined,
      };

      await updateProfile(updateData);
      setHasChanges(false);
      setIsImageChanged(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const resetForm = () => {
    if (user) {
      setProfileData({
        fullname: user.fullname || "",
        email: user.email || "",
        contact: user.contact?.toString() || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        profilePicture: user.profilePicture || "",
      });
      setSelectedProfilePicture(user.profilePicture || "");
      setHasChanges(false);
      setIsImageChanged(false);
      setErrors({});
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Profile Settings</CardTitle>
              <p className="text-muted-foreground mt-2">
                Manage your account information and preferences
              </p>
            </div>
            {user?.isVerified ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified Account
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-yellow-200 text-yellow-800"
              >
                <AlertCircle className="mr-1 h-3 w-3" />
                Unverified Account
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={updateProfileHandler} className="space-y-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={selectedProfilePicture || profileData.profilePicture}
                    alt="Profile Picture"
                  />
                  <AvatarFallback className="text-2xl">
                    {getInitials(
                      profileData.fullname || user?.fullname || "User"
                    )}
                  </AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={() => imageRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white rounded-full p-2">
                      <Camera className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </button>

                <input
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                  className="hidden"
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Click to change your profile picture
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF (max. 5MB)
                </p>
              </div>

              {isImageChanged && (
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Profile picture will be updated when you save changes.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullname" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={profileData.fullname}
                  onChange={changeHandler}
                  placeholder="Enter your full name"
                  className={errors.fullname ? "border-red-500" : ""}
                />
                {errors.fullname && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullname}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={profileData.contact}
                  onChange={changeHandler}
                  placeholder="Enter your phone number"
                  className={errors.contact ? "border-red-500" : ""}
                />
                {errors.contact && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={changeHandler}
                  placeholder="Enter your address"
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={profileData.city}
                  onChange={changeHandler}
                  placeholder="Enter your city"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={profileData.country}
                  onChange={changeHandler}
                  placeholder="Enter your country"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex items-center gap-2">
                {hasChanges && (
                  <Alert className="border-yellow-200 bg-yellow-50 py-2 px-3">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800 ml-2">
                      You have unsaved changes
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex gap-3">
                {hasChanges && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={loading || !hasChanges}
                  className="min-w-[120px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
