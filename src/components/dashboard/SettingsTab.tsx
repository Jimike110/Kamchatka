import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCurrency } from "../../contexts/CurrencyContext";
import { toast } from "sonner";
import {
  Settings,
  Globe,
  DollarSign,
  Bell,
  Shield,
  Moon,
  Sun,
  Languages,
  Save,
} from "lucide-react";

export function SettingsTab() {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
    bookingUpdates: true,
    paymentAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareBookingHistory: false,
    allowDataCollection: true,
  });

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Settings save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Language & Currency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Language & Currency</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center space-x-2">
                <Languages className="h-4 w-4" />
                <span>{t("profile.language")}</span>
              </Label>
              <Select
                value={language}
                onValueChange={(value: "en" | "ru" | "de") =>
                  setLanguage(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{t("profile.currency")}</span>
              </Label>
              <Select
                value={currency}
                onValueChange={(value: "USD" | "EUR" | "RUB") =>
                  setCurrency(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">{t("currency.usd")} ($)</SelectItem>
                  <SelectItem value="EUR">{t("currency.eur")} (€)</SelectItem>
                  <SelectItem value="RUB">{t("currency.rub")} (₽)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isDarkMode ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-600">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={() => toggleNotification("email")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-600">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={() => toggleNotification("push")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-gray-600">
                  Receive notifications via SMS
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.sms}
                onCheckedChange={() => toggleNotification("sms")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="booking-updates">Booking Updates</Label>
                <p className="text-sm text-gray-600">
                  Get notified about booking status changes
                </p>
              </div>
              <Switch
                id="booking-updates"
                checked={notifications.bookingUpdates}
                onCheckedChange={() => toggleNotification("bookingUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payment-alerts">Payment Alerts</Label>
                <p className="text-sm text-gray-600">
                  Get notified about payment confirmations
                </p>
              </div>
              <Switch
                id="payment-alerts"
                checked={notifications.paymentAlerts}
                onCheckedChange={() => toggleNotification("paymentAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing">Marketing Communications</Label>
                <p className="text-sm text-gray-600">
                  Receive promotional offers and updates
                </p>
              </div>
              <Switch
                id="marketing"
                checked={notifications.marketing}
                onCheckedChange={() => toggleNotification("marketing")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visible">Public Profile</Label>
                <p className="text-sm text-gray-600">
                  Make your profile visible to other users
                </p>
              </div>
              <Switch
                id="profile-visible"
                checked={privacy.profileVisible}
                onCheckedChange={() => togglePrivacy("profileVisible")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-booking-history">
                  Share Booking History
                </Label>
                <p className="text-sm text-gray-600">
                  Allow others to see your booking history
                </p>
              </div>
              <Switch
                id="share-booking-history"
                checked={privacy.shareBookingHistory}
                onCheckedChange={() => togglePrivacy("shareBookingHistory")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection">
                  Analytics & Data Collection
                </Label>
                <p className="text-sm text-gray-600">
                  Help improve our service with usage data
                </p>
              </div>
              <Switch
                id="data-collection"
                checked={privacy.allowDataCollection}
                onCheckedChange={() => togglePrivacy("allowDataCollection")}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              Download My Data
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Download a copy of all your personal data
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Update Email Address
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? t("common.loading") : t("common.save")}
        </Button>
      </div>
    </div>
  );
}
