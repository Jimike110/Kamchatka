import React, { createContext, useContext, useState, useEffect } from "react";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.catalog": "Catalog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.dashboard": "Dashboard",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",
    "nav.search": "Search",
    "nav.menu": "Menu",
    "nav.cart": "Cart",
    "nav.language": "Language",
    "nav.currency": "Currency",
    "nav.services": "Services",
    "nav.tours": "Tours",
    "nav.hunting": "Hunting",
    "nav.fishing": "Fishing",
    "nav.recreation": "Recreation",

    // Hero
    "hero.title": "Discover Kamchatka",
    "hero.subtitle": "Unforgettable Adventures in the Land of Volcanoes",
    "hero.description":
      "Experience pristine wilderness, volcanic landscapes, and world-class adventure activities in Russia's most remote peninsula.",
    "hero.cta": "Explore Services",
    "hero.ctaSecondary": "View Video Tour",
    "hero.stats.services": "Premium Services",
    "hero.stats.guides": "Expert Guides",
    "hero.stats.clients": "Happy Clients",
    "hero.stats.years": "Years Experience",
    "hero.location": "Kamchatka Peninsula, Russia",
    "hero.trustIndicator": "Licensed & Insured",

    // Services Section
    "services.title": "Choose Your Adventure",
    "services.subtitle": "Explore our premium adventure tourism services",
    "services.hunting": "Hunting",
    "services.fishing": "Fishing",
    "services.recreation": "Recreation Centers",
    "services.tours": "Tours & Expeditions",
    "services.hunting.desc":
      "World-class hunting expeditions with expert guides",
    "services.fishing.desc": "Premium fishing experiences in pristine waters",
    "services.recreation.desc": "Luxury accommodation and wellness facilities",
    "services.tours.desc":
      "Guided tours to Kamchatka's most spectacular locations",
    "services.viewAll": "View All Services",
    "services.bookNow": "Book Now",
    "services.learnMore": "Learn More",
    "services.exploreAdventures": "Explore Adventures",
    "services.allServicesTitle": "All Services",
    "services.allServicesSubtitle":
      "Discover our complete collection of wilderness adventures.",

    // History Section
    "history.title": "Experience the Wilderness",
    "history.subtitle":
      "Kamchatka Peninsula offers some of the most pristine wilderness experiences on Earth",
    "history.description":
      "Home to the world's largest brown bears, active volcanoes, and untouched landscapes, Kamchatka is a destination like no other. Our expert guides and premium services ensure your adventure is both safe and unforgettable.",
    "history.features.wildlife": "Unique Wildlife",
    "history.features.volcanoes": "Active Volcanoes",
    "history.features.fishing": "World-Class Fishing",
    "history.features.guides": "Expert Guides",

    // Service Catalog
    "catalog.title": "Our Services",
    "catalog.filter": "Filter",
    "catalog.filterBy": "Filter by",
    "catalog.sort": "Sort by",
    "catalog.sortBy": "Sort by",
    "catalog.category": "Category",
    "catalog.price": "Price",
    "catalog.duration": "Duration",
    "catalog.difficulty": "Difficulty",
    "catalog.rating": "Rating",
    "catalog.location": "Location",
    "catalog.availability": "Availability",
    "catalog.from": "From",
    "catalog.to": "To",
    "catalog.reset": "Reset Filters",
    "catalog.apply": "Apply Filters",
    "catalog.results": "results found",
    "catalog.noResults": "No services found",
    "catalog.loadMore": "Load More Services",
    "catalog.showLess": "Show Less",
    "catalog.perPerson": "per person",
    "catalog.days": "days",
    "catalog.hours": "hours",
    "catalog.addToCart": "Add to Cart",
    "catalog.addToFavorites": "Add to Favorites",
    "catalog.removeFromFavorites": "Remove from Favorites",
    "catalog.share": "Share",
    "catalog.viewDetails": "View Details",
    "catalog.bookNow": "Book Now",
    "catalog.reviews": "reviews",
    "catalog.available": "Available",
    "catalog.unavailable": "Unavailable",
    "catalog.soldOut": "Sold Out",
    "catalog.highestRated": "Highest Rated",
    "catalog.mostReviewed": "Most Reviewed",
    "catalog.priceLowHigh": "Price: Low to High",
    "catalog.priceHighLow": "Price: High to Low",
    "catalog.alphabetical": "Alphabetical",
    "catalog.newestFirst": "Newest First",
    "catalog.clearFilters": "Clear Filters",

    // imageCarousel
    "imageCarousel.alt": "{title} - Image {index}",

    // Booking
    "booking.title": "Book Your Adventure",
    "booking.selectDates": "Select Dates",
    "booking.selectTime": "Select Time",
    "booking.selectGuests": "Select Guests",
    "booking.adults": "Adults",
    "booking.children": "Children",
    "booking.infants": "Infants",
    "booking.morning": "Morning",
    "booking.afternoon": "Afternoon",
    "booking.evening": "Evening",
    "booking.night": "Night",
    "booking.availableDates": "Available Dates",
    "booking.unavailableDates": "Unavailable Dates",
    "booking.selectDate": "Please select a date",
    "booking.selectTimeSlot": "Please select a time slot",
    "booking.serviceDetails": "Service Details",
    "booking.totalPrice": "Total Price",
    "booking.priceBreakdown": "Price Breakdown",
    "booking.basePrice": "Base Price",
    "booking.taxes": "Taxes & Fees",
    "booking.discount": "Discount",
    "booking.deposit": "Deposit Required",
    "booking.fullPayment": "Full Payment",
    "booking.paymentMethod": "Payment Method",
    "booking.contactInfo": "Contact Information",
    "booking.specialRequests": "Special Requests",
    "booking.terms": "Terms & Conditions",
    "booking.privacy": "Privacy Policy",
    "booking.agree": "I agree to the",
    "booking.and": "and",
    "booking.confirmBooking": "Confirm Booking",
    "booking.processing": "Processing...",
    "booking.success": "Booking confirmed successfully!",
    "booking.error": "Booking failed. Please try again.",
    "booking.pending": "Pending",
    "booking.confirmed": "Confirmed",
    "booking.completed": "Completed",
    "booking.cancelled": "Cancelled",
    "booking.rejected": "Rejected",
    "booking.supplierResponse": "Awaiting supplier response",
    "booking.supplierTimeout": "Supplier response timeout",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.items": "items",
    "cart.item": "item",
    "cart.subtotal": "Subtotal",
    "cart.total": "Total",
    "cart.remove": "Remove",
    "cart.update": "Update",
    "cart.checkout": "Proceed to Checkout",
    "cart.continueShopping": "Continue Shopping",
    "cart.addedToCart": "Added to cart",
    "cart.removedFromCart": "Removed from cart",
    "cart.updatedCart": "Cart updated",
    "cart.clearCart": "Clear Cart",
    "cart.saveForLater": "Save for Later",

    // Dashboard
    "dashboard.title": "My Dashboard",
    "dashboard.profile": "Profile",
    "dashboard.bookings": "My Bookings",
    "dashboard.balance": "Balance",
    "dashboard.referrals": "Referrals",
    "dashboard.settings": "Settings",
    "dashboard.favorites": "Favorites",
    "dashboard.welcome": "Welcome back",
    "dashboard.points": "points",
    "dashboard.totalBookings": "Total Bookings",
    "dashboard.activeBookings": "Active Bookings",
    "dashboard.completedBookings": "Completed",
    "dashboard.upcomingBookings": "Upcoming",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.viewAllBookings": "View All Bookings",
    "dashboard.topUpBalance": "Top Up Balance",
    "dashboard.inviteFriends": "Invite Friends",
    "dashboard.editProfile": "Edit Profile",

    // Profile
    "profile.title": "My Profile",
    "profile.personalInfo": "Personal Information",
    "profile.name": "Full Name",
    "profile.email": "Email",
    "profile.phone": "Phone",
    "profile.country": "Country",
    "profile.language": "Language",
    "profile.currency": "Currency",
    "profile.preferences": "Preferences",
    "profile.notifications": "Notifications",
    "profile.emailNotifications": "Email Notifications",
    "profile.smsNotifications": "SMS Notifications",
    "profile.marketing": "Marketing Communications",
    "profile.updateSuccess": "Profile updated successfully",
    "profile.updateError": "Failed to update profile",
    "profile.passwordChange": "Change Password",
    "profile.currentPassword": "Current Password",
    "profile.newPassword": "New Password",
    "profile.confirmPassword": "Confirm New Password",
    "profile.deleteAccount": "Delete Account",
    "profile.deleteWarning": "This action cannot be undone",

    // Authentication
    "auth.login": "Sign In",
    "auth.signup": "Sign Up",
    "auth.logout": "Sign Out",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.forgotPassword": "Forgot Password?",
    "auth.resetPassword": "Reset Password",
    "auth.createAccount": "Create Account",
    "auth.haveAccount": "Already have an account?",
    "auth.noAccount": "Don't have an account?",
    "auth.signInWith": "Sign in with",
    "auth.signUpWith": "Sign up with",
    "auth.google": "Google",
    "auth.facebook": "Facebook",
    "auth.or": "or",
    "auth.terms": "Terms of Service",
    "auth.privacy": "Privacy Policy",
    "auth.agreeTerms": "I agree to the Terms of Service and Privacy Policy",
    "auth.success": "Successfully signed in",
    "auth.error": "Authentication failed",
    "auth.emailSent": "Reset email sent",
    "auth.invalidCredentials": "Invalid email or password",
    "auth.accountExists": "Account already exists",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.book": "Book Now",
    "common.price": "Price",
    "common.date": "Date",
    "common.duration": "Duration",
    "common.guests": "Guests",
    "common.total": "Total",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.confirm": "Confirm",
    "common.yes": "Yes",
    "common.no": "No",
    "common.ok": "OK",
    "common.error": "Error",
    "common.success": "Success",
    "common.warning": "Warning",
    "common.info": "Information",
    "common.required": "Required",
    "common.optional": "Optional",
    "common.select": "Select",
    "common.all": "All",
    "common.none": "None",
    "common.more": "More",
    "common.less": "Less",
    "common.show": "Show",
    "common.hide": "Hide",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.clear": "Clear",
    "common.apply": "Apply",
    "common.reset": "Reset",
    "common.scroll": "Scroll to explore",
    "common.rating": "Rating",
    "common.premium": "Premium",
    "common.popular": "Popular",
    "common.luxury": "Luxury",
    "common.adventure": "Adventure",
    "common.hello": "Hello",
    "common.brandName": "Kamchatka",
    "common.tagline": "Wild Adventures",
    "common.explore": "Explore",
    "common.account": "Account",
    "common.filters": "Filters",
    "common.gridView": "Grid View",
    "common.listView": "List View",
    "common.zoomIn": "Zoom In",
    "common.noImages": "No images available",
    "common.videoNotSupported": "Your browser does not support the video tag.",
    "common.featured": "Featured",
    "common.by": "by",
    "common.of": "of",
    "common.continueExploring": "Continue Exploring",
    "common.fullName": "Full Name",
    "common.phone": "Phone",
    "common.country": "Country",
    "common.address": "Address",
    "common.subscribe": "Subscribe",
    "common.processing": "Processing...",

    // Footer
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.ourStory": "Our Story",
    "footer.team": "Our Team",
    "footer.careers": "Careers",
    "footer.press": "Press",
    "footer.services": "Services",
    "footer.hunting": "Hunting",
    "footer.fishing": "Fishing",
    "footer.recreation": "Recreation",
    "footer.tours": "Tours",
    "footer.support": "Support",
    "footer.help": "Help Center",
    "footer.contact": "Contact Us",
    "footer.faq": "FAQ",
    "footer.safety": "Safety",
    "footer.legal": "Legal",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
    "footer.copyright": "All rights reserved",
    "footer.followUs": "Follow Us",
    "footer.newsletter": "Newsletter",
    "footer.subscribe": "Subscribe to our newsletter",
    "footer.email": "Your email",
    "footer.subscribeBtn": "Subscribe",
    "footer.ourServices": "Our Services",
    "footer.quickLinks": "Quick Links",
    "footer.stayConnected": "Stay Connected",
    "footer.newsletterDescription": "Get the latest deals and adventure news.",
    "footer.trustedCertified": "Trusted & Certified",
    "footer.highestStandards":
      "We operate under the highest standards of safety and quality.",
    "footer.licensed": "Licensed Operator",
    "footer.insured": "Fully Insured",
    "footer.unescoPartner": "UNESCO Partner",
    "footer.securePayments": "Secure Payments",
    "footer.allRightsReserved": "All rights reserved",
    "footer.description":
      "Your gateway to the untamed beauty of the Kamchatka Peninsula.",
    "footer.licensedOperator": "Licensed Tourism Operator",

    // Search
    "search.placeholder": "Search services, tours, locations...",
    "search.results": "Search Results",
    "search.noResults": "No results found for",
    "search.suggestions": "Suggestions",
    "search.popular": "Popular Searches",
    "search.recent": "Recent Searches",
    "search.clear": "Clear Search",
    "search.searchFor": "Search for",
    "search.showing": "Showing",
    "search.placeholderShort": "Search...",
    "search.viewAllResultsFor": 'View all results for "{query}"',
    "search.showingResults": "Showing {start}-{end} of {total} results",

    // Currency
    "currency.usd": "US Dollar",
    "currency.eur": "Euro",
    "currency.rub": "Russian Ruble",

    // Categories
    "categories.all": "All Categories",
    "categories.hunting": "Hunting",
    "categories.fishing": "Fishing",
    "categories.recreation": "Recreation",
    "categories.tours": "Tours",
    "categories.adventure": "Adventure Sports",
    "categories.wildlife": "Wildlife Watching",
    "categories.photography": "Photography Tours",
    "categories.cultural": "Cultural Experiences",

    // share
    "share.copied": "Link copied!",
    "share.copyFailed": "Failed to copy link.",
    "share.shareFailed": "Could not share.",
    "share.native": "Share",
    "share.copyLink": "Copy Link",
    "share.text": "Check out this amazing adventure: {title}",

    // Time slots
    "time.morning": "Morning (6:00 - 12:00)",
    "time.afternoon": "Afternoon (12:00 - 18:00)",
    "time.evening": "Evening (18:00 - 22:00)",
    "time.night": "Night (22:00 - 6:00)",

    // Difficulty levels
    "difficulty.easy": "Easy",
    "difficulty.moderate": "Moderate",
    "difficulty.hard": "Hard",
    "difficulty.expert": "Expert",

    // Notifications
    "notification.bookingConfirmed": "Your booking has been confirmed",
    "notification.bookingCancelled": "Your booking has been cancelled",
    "notification.paymentReceived": "Payment received successfully",
    "notification.supplierResponse": "Supplier has responded to your booking",
    "notification.reminderDayBefore": "Reminder: Your trip is tomorrow",
    "notification.tripCompleted": "How was your trip? Leave a review",

    // Contact
    "contact.hero.description":
      "Get in touch with our team for any questions about your Kamchatka adventure or to book a custom experience.",
    "contact.form.title": "Send us a Message",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder":
      "Tell us about your adventure requirements...",
    "contact.form.send": "Send Message",
    "contact.success": "Message sent successfully! We'll get back to you soon.",
    "contact.error": "Failed to send message. Please try again.",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Address",
    "contact.info.hours": "Business Hours",
    "contact.info.weekdays": "Weekdays",
    "contact.info.weekends": "Weekends",
    "contact.info.timezone": "Kamchatka Time (GMT+12)",
    "contact.emergency.title": "Emergency Contact",
    "contact.emergency.description":
      "For emergencies during your trip, use these 24/7 contacts:",
    "contact.emergency.line": "Emergency Line",
    "contact.emergency.satellite": "Satellite Phone",
    "contact.faq.description":
      "Find answers to common questions about our services.",
    "contact.faq.visit": "Visit FAQ Page",

    // Static Pages
    "pages.comingSoon": "Coming Soon",
    "pages.comingSoonDescription":
      "This page is currently under development. Check back soon for updates.",
    "pages.ourStory.content":
      "Our story begins with a passion for adventure and a deep respect for the pristine wilderness of Kamchatka...",
    "pages.team.content":
      "Meet our team of experienced guides and adventure specialists...",
    "pages.careers.content":
      "Join our team and help others discover the magic of Kamchatka...",
    "pages.press.content":
      "Press releases and media information about Kamchatka Adventures...",
    "pages.help.content":
      "Find help and support for your Kamchatka adventure experience...",
    "pages.faq.content":
      "Frequently asked questions about our services and destinations...",
    "pages.safety.content":
      "Safety is our top priority. Learn about our safety protocols and guidelines...",
    "pages.terms.content": "Terms and conditions for using our services...",
    "pages.privacy.content":
      "Our privacy policy and how we protect your personal information...",
    "pages.cookies.content":
      "Information about how we use cookies on our website...",

    // About Page
    "about.hero.description":
      "We are passionate adventurers dedicated to sharing the incredible wilderness of Kamchatka with fellow explorers from around the world.",
    "about.mission.title": "Our Mission",
    "about.mission.description":
      "To provide exceptional wilderness adventures while preserving the pristine beauty of Kamchatka for future generations.",
    "about.mission.details":
      "We believe that adventure and conservation go hand in hand. Every expedition we organize contributes to local conservation efforts and sustainable tourism practices.",
    "about.stats.years": "Years of Experience",
    "about.stats.clients": "Happy Adventurers",
    "about.stats.services": "Adventure Services",
    "about.stats.guides": "Expert Guides",
    "about.values.title": "Our Values",
    "about.values.subtitle":
      "What drives us to create exceptional wilderness experiences",
    "about.values.adventure": "Adventure First",
    "about.values.adventure.desc":
      "We create unforgettable experiences that push boundaries",
    "about.values.sustainability": "Sustainability",
    "about.values.sustainability.desc":
      "Protecting nature for future generations",
    "about.values.safety": "Safety Always",
    "about.values.safety.desc": "Your safety is our highest priority",
    "about.values.service": "Exceptional Service",
    "about.values.service.desc": "Going above and beyond for every guest",
    "about.team.description":
      "Our team consists of experienced guides, adventure specialists, and local experts who know Kamchatka like no one else.",
    "about.team.meet": "Meet Our Team",
    "about.cta.title": "Ready for Your Adventure?",
    "about.cta.description":
      "Join thousands of adventurers who have discovered the magic of Kamchatka with us.",

    // Error messages
    "error.generic": "Something went wrong. Please try again.",
    "error.network": "Network error. Please check your connection.",
    "error.serverError": "Server error. Please try again later.",
    "error.notFound": "Page not found",
    "error.pageNotFound": "The page you are looking for could not be found.",
    "error.unauthorized": "You are not authorized to access this page",
    "error.forbidden": "Access forbidden",
    "error.validation": "Please check your input and try again",
    "error.paymentFailed": "Payment failed. Please try again.",
    "error.bookingFailed": "Booking failed. Please try again.",
    "error.loginRequired": "Please log in to continue",
    "error.categoryNotFound": "Category not found",
    "error.serviceNotFound": "Service not found",

    // Checkout
    "checkout.completeBooking": "Complete Booking",
    "checkout.reviewDetails": "Review your details and complete your booking.",
    "checkout.bookingSummary": "Booking Summary",
    "checkout.subtotal": "Subtotal",
    "checkout.serviceFee": "Service Fee",
    "checkout.taxes": "Taxes",
    "checkout.total": "Total",
    "checkout.securePayment": "Secure payment powered by Stripe.",
    "checkout.paymentMethod": "Payment Method",
    "checkout.contactInfo": "Contact Info",
    "checkout.termsAgreement":
      "By completing this booking, you agree to our Terms of Service and Privacy Policy.",
    "checkout.payNow": "Pay Now",
    "checkout.bookingSuccess": "Booking Successful!",
    "checkout.bookingFailed": "Booking Failed",
    "checkout.paymentFailed": "Payment processing failed. Please try again.",
    "checkout.bookingConfirmation": "Booking Confirmation",
    "checkout.bookingConfirmed": "Booking Confirmed!",
    "checkout.confirmationEmailSent":
      "A confirmation email with your booking details has been sent.",

    // Payment
    "payment.card": "Card",
    "payment.sbp": "SBP",
    "payment.crypto": "Crypto",
    "payment.cardNumber": "Card Number",
    "payment.expiryDate": "Expiry Date",
    "payment.cvv": "CVV",
    "payment.rubPayment": "RUB Payment Only",
    "payment.sbpRedirect": "You will be redirected to complete your payment.",
    "payment.cryptoPayment": "Crypto Payment",
    "payment.metaMaskConnect": "Connect with MetaMask to pay.",
  },

  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.catalog": "Каталог",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.dashboard": "Панель управления",
    "nav.login": "Вход",
    "nav.signup": "Регистрация",
    "nav.logout": "Выход",
    "nav.search": "Поиск",
    "nav.menu": "Меню",
    "nav.cart": "Корзина",
    "nav.language": "Язык",
    "nav.currency": "Валюта",
    "nav.services": "Услуги",
    "nav.tours": "Туры",
    "nav.hunting": "Охота",
    "nav.fishing": "Рыбалка",
    "nav.recreation": "Отдых",

    // Hero
    "hero.title": "Откройте для себя Камчатку",
    "hero.subtitle": "Незабываемые приключения в краю вулканов",
    "hero.description":
      "Исследуйте нетронутую дикую природу, вулканические пейзажи и первоклассные приключения на самом отдаленном полуострове России.",
    "hero.cta": "Наши услуги",
    "hero.ctaSecondary": "Смотреть видеотур",
    "hero.stats.services": "Премиум-услуг",
    "hero.stats.guides": "Опытных гидов",
    "hero.stats.clients": "Счастливых клиентов",
    "hero.stats.years": "Лет опыта",
    "hero.location": "Полуостров Камчатка, Россия",
    "hero.trustIndicator": "Лицензировано и застраховано",

    // Services Section
    "services.title": "Выберите свое приключение",
    "services.subtitle":
      "Ознакомьтесь с нашими премиальными услугами в сфере приключенческого туризма",
    "services.hunting": "Охота",
    "services.fishing": "Рыбалка",
    "services.recreation": "Базы отдыха",
    "services.tours": "Туры и экспедиции",
    "services.hunting.desc":
      "Охотничьи экспедиции мирового класса с опытными гидами",
    "services.fishing.desc": "Премиальная рыбалка в кристально чистых водах",
    "services.recreation.desc": "Роскошное размещение и оздоровительные центры",
    "services.tours.desc":
      "Экскурсии с гидом по самым захватывающим местам Камчатки",
    "services.viewAll": "Посмотреть все услуги",
    "services.bookNow": "Забронировать",
    "services.learnMore": "Узнать больше",
    "services.exploreAdventures": "Исследуйте приключения",
    "services.allServicesTitle": "Все услуги",
    "services.allServicesSubtitle":
      "Откройте для себя нашу полную коллекцию приключений в дикой природе.",

    // History Section
    "history.title": "Почувствуйте дикую природу",
    "history.subtitle":
      "Полуостров Камчатка предлагает одни из самых нетронутых природных впечатлений на Земле",
    "history.description":
      "Камчатка, родина крупнейших в мире бурых медведей, действующих вулканов и нетронутых ландшафтов, является уникальным местом. Наши опытные гиды и первоклассные услуги гарантируют, что ваше приключение будет безопасным и незабываемым.",
    "history.features.wildlife": "Уникальная фауна",
    "history.features.volcanoes": "Действующие вулканы",
    "history.features.fishing": "Рыбалка мирового класса",
    "history.features.guides": "Опытные гиды",

    // Service Catalog
    "catalog.title": "Наши услуги",
    "catalog.filter": "Фильтр",
    "catalog.filterBy": "Фильтровать по",
    "catalog.sort": "Сортировать по",
    "catalog.sortBy": "Сортировать по",
    "catalog.category": "Категория",
    "catalog.price": "Цена",
    "catalog.duration": "Продолжительность",
    "catalog.difficulty": "Сложность",
    "catalog.rating": "Рейтинг",
    "catalog.location": "Местоположение",
    "catalog.availability": "Доступность",
    "catalog.from": "От",
    "catalog.to": "До",
    "catalog.reset": "Сбросить фильтры",
    "catalog.apply": "Применить",
    "catalog.results": "результатов найдено",
    "catalog.noResults": "Услуги не найдены",
    "catalog.loadMore": "Загрузить еще",
    "catalog.showLess": "Показать меньше",
    "catalog.perPerson": "с человека",
    "catalog.days": "дней",
    "catalog.hours": "часов",
    "catalog.addToCart": "В корзину",
    "catalog.addToFavorites": "В избранное",
    "catalog.removeFromFavorites": "Удалить из избранного",
    "catalog.share": "Поделиться",
    "catalog.viewDetails": "Подробнее",
    "catalog.bookNow": "Забронировать",
    "catalog.reviews": "отзывов",
    "catalog.available": "Доступно",
    "catalog.unavailable": "Недоступно",
    "catalog.soldOut": "Распродано",
    "catalog.highestRated": "Самый высокий рейтинг",
    "catalog.mostReviewed": "Больше всего отзывов",
    "catalog.priceLowHigh": "Цена: по возрастанию",
    "catalog.priceHighLow": "Цена: по убыванию",
    "catalog.alphabetical": "По алфавиту",
    "catalog.newestFirst": "Сначала новые",
    "catalog.clearFilters": "Очистить фильтры",

    // imageCarousel
    "imageCarousel.alt": "{title} - Изображение {index}",

    // Booking
    "booking.title": "Забронировать приключение",
    "booking.selectDates": "Выберите даты",
    "booking.selectTime": "Выберите время",
    "booking.selectGuests": "Выберите количество гостей",
    "booking.adults": "Взрослые",
    "booking.children": "Дети",
    "booking.infants": "Младенцы",
    "booking.morning": "Утро",
    "booking.afternoon": "День",
    "booking.evening": "Вечер",
    "booking.night": "Ночь",
    "booking.availableDates": "Свободные даты",
    "booking.unavailableDates": "Даты недоступны",
    "booking.selectDate": "Пожалуйста, выберите дату",
    "booking.selectTimeSlot": "Пожалуйста, выберите время",
    "booking.serviceDetails": "Детали услуги",
    "booking.totalPrice": "Итоговая стоимость",
    "booking.priceBreakdown": "Расчет стоимости",
    "booking.basePrice": "Базовая цена",
    "booking.taxes": "Налоги и сборы",
    "booking.discount": "Скидка",
    "booking.deposit": "Требуется предоплата",
    "booking.fullPayment": "Полная оплата",
    "booking.paymentMethod": "Способ оплаты",
    "booking.contactInfo": "Контактная информация",
    "booking.specialRequests": "Особые пожелания",
    "booking.terms": "Условия предоставления услуг",
    "booking.privacy": "Политика конфиденциальности",
    "booking.agree": "Я согласен с",
    "booking.and": "и",
    "booking.confirmBooking": "Подтвердить бронирование",
    "booking.processing": "Обработка...",
    "booking.success": "Бронирование успешно подтверждено!",
    "booking.error":
      "Не удалось забронировать. Пожалуйста, попробуйте еще раз.",
    "booking.pending": "В ожидании",
    "booking.confirmed": "Подтверждено",
    "booking.completed": "Завершено",
    "booking.cancelled": "Отменено",
    "booking.rejected": "Отклонено",
    "booking.supplierResponse": "Ожидание ответа поставщика",
    "booking.supplierTimeout": "Время ожидания ответа поставщика истекло",

    // Cart
    "cart.title": "Корзина",
    "cart.empty": "Ваша корзина пуста",
    "cart.items": "товаров",
    "cart.item": "товар",
    "cart.subtotal": "Подытог",
    "cart.total": "Итого",
    "cart.remove": "Удалить",
    "cart.update": "Обновить",
    "cart.checkout": "Перейти к оплате",
    "cart.continueShopping": "Продолжить покупки",
    "cart.addedToCart": "Добавлено в корзину",
    "cart.removedFromCart": "Удалено из корзины",
    "cart.updatedCart": "Корзина обновлена",
    "cart.clearCart": "Очистить корзину",
    "cart.saveForLater": "Сохранить на потом",

    // Dashboard
    "dashboard.title": "Моя панель",
    "dashboard.profile": "Профиль",
    "dashboard.bookings": "Мои бронирования",
    "dashboard.balance": "Баланс",
    "dashboard.referrals": "Рефералы",
    "dashboard.settings": "Настройки",
    "dashboard.favorites": "Избранное",
    "dashboard.welcome": "С возвращением",
    "dashboard.points": "баллов",
    "dashboard.totalBookings": "Всего бронирований",
    "dashboard.activeBookings": "Активных",
    "dashboard.completedBookings": "Завершенных",
    "dashboard.upcomingBookings": "Предстоящие",
    "dashboard.recentActivity": "Недавние действия",
    "dashboard.quickActions": "Быстрые действия",
    "dashboard.viewAllBookings": "Посмотреть все бронирования",
    "dashboard.topUpBalance": "Пополнить баланс",
    "dashboard.inviteFriends": "Пригласить друзей",
    "dashboard.editProfile": "Редактировать профиль",

    // Profile
    "profile.title": "Мой профиль",
    "profile.personalInfo": "Личная информация",
    "profile.name": "Полное имя",
    "profile.email": "Эл. почта",
    "profile.phone": "Телефон",
    "profile.country": "Страна",
    "profile.language": "Язык",
    "profile.currency": "Валюта",
    "profile.preferences": "Предпочтения",
    "profile.notifications": "Уведомления",
    "profile.emailNotifications": "Уведомления по эл. почте",
    "profile.smsNotifications": "SMS-уведомления",
    "profile.marketing": "Маркетинговые рассылки",
    "profile.updateSuccess": "Профиль успешно обновлен",
    "profile.updateError": "Не удалось обновить профиль",
    "profile.passwordChange": "Изменить пароль",
    "profile.currentPassword": "Текущий пароль",
    "profile.newPassword": "Новый пароль",
    "profile.confirmPassword": "Подтвердите новый пароль",
    "profile.deleteAccount": "Удалить аккаунт",
    "profile.deleteWarning": "Это действие необратимо",

    // Authentication
    "auth.login": "Войти",
    "auth.signup": "Регистрация",
    "auth.logout": "Выйти",
    "auth.email": "Эл. почта",
    "auth.password": "Пароль",
    "auth.confirmPassword": "Подтвердите пароль",
    "auth.firstName": "Имя",
    "auth.lastName": "Фамилия",
    "auth.forgotPassword": "Забыли пароль?",
    "auth.resetPassword": "Сбросить пароль",
    "auth.createAccount": "Создать аккаунт",
    "auth.haveAccount": "Уже есть аккаунт?",
    "auth.noAccount": "Нет аккаунта?",
    "auth.signInWith": "Войти через",
    "auth.signUpWith": "Зарегистрироваться через",
    "auth.google": "Google",
    "auth.facebook": "Facebook",
    "auth.or": "или",
    "auth.terms": "Условия предоставления услуг",
    "auth.privacy": "Политика конфиденциальности",
    "auth.agreeTerms":
      "Я согласен с Условиями предоставления услуг и Политикой конфиденциальности",
    "auth.success": "Успешный вход",
    "auth.error": "Ошибка аутентификации",
    "auth.emailSent": "Письмо для сброса пароля отправлено",
    "auth.invalidCredentials": "Неверный адрес эл. почты или пароль",
    "auth.accountExists": "Аккаунт уже существует",

    // Common
    "common.loading": "Загрузка...",
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.edit": "Изменить",
    "common.delete": "Удалить",
    "common.view": "Просмотр",
    "common.book": "Забронировать",
    "common.price": "Цена",
    "common.date": "Дата",
    "common.duration": "Длительность",
    "common.guests": "Гости",
    "common.total": "Итого",
    "common.close": "Закрыть",
    "common.back": "Назад",
    "common.next": "Далее",
    "common.previous": "Назад",
    "common.submit": "Отправить",
    "common.confirm": "Подтвердить",
    "common.yes": "Да",
    "common.no": "Нет",
    "common.ok": "OK",
    "common.error": "Ошибка",
    "common.success": "Успешно",
    "common.warning": "Внимание",
    "common.info": "Информация",
    "common.required": "Обязательно",
    "common.optional": "Необязательно",
    "common.select": "Выберите",
    "common.all": "Все",
    "common.none": "Ничего",
    "common.more": "Больше",
    "common.less": "Меньше",
    "common.show": "Показать",
    "common.hide": "Скрыть",
    "common.search": "Поиск",
    "common.filter": "Фильтр",
    "common.sort": "Сортировка",
    "common.clear": "Очистить",
    "common.apply": "Применить",
    "common.reset": "Сбросить",
    "common.scroll": "Листайте вниз",
    "common.rating": "Рейтинг",
    "common.premium": "Премиум",
    "common.popular": "Популярное",
    "common.luxury": "Люкс",
    "common.adventure": "Приключение",
    "common.hello": "Привет",
    "common.brandName": "Камчатка",
    "common.tagline": "Дикие приключения",
    "common.explore": "Исследовать",
    "common.account": "Аккаунт",
    "common.filters": "Фильтры",
    "common.gridView": "Сетка",
    "common.listView": "Список",
    "common.zoomIn": "Увеличить",
    "common.noImages": "Нет изображений",
    "common.videoNotSupported": "Ваш браузер не поддерживает тег video.",
    "common.featured": "Рекомендуемое",
    "common.by": "от",
    "common.of": "из",
    "common.continueExploring": "Продолжить исследование",
    "common.fullName": "Полное имя",
    "common.phone": "Телефон",
    "common.country": "Страна",
    "common.address": "Адрес",
    "common.subscribe": "Подписаться",
    "common.processing": "Обработка...",
    "common.cart": "Корзина",

    // Footer
    "footer.company": "Компания",
    "footer.about": "О нас",
    "footer.ourStory": "Наша история",
    "footer.team": "Наша команда",
    "footer.careers": "Карьера",
    "footer.press": "Пресса",
    "footer.services": "Услуги",
    "footer.hunting": "Охота",
    "footer.fishing": "Рыбалка",
    "footer.recreation": "Отдых",
    "footer.tours": "Туры",
    "footer.support": "Поддержка",
    "footer.help": "Центр помощи",
    "footer.contact": "Связаться с нами",
    "footer.faq": "ЧаВо",
    "footer.safety": "Безопасность",
    "footer.legal": "Юридическая информация",
    "footer.terms": "Условия использования",
    "footer.privacy": "Политика конфиденциальности",
    "footer.cookies": "Политика cookie",
    "footer.copyright": "Все права защищены",
    "footer.followUs": "Следите за нами",
    "footer.newsletter": "Новостная рассылка",
    "footer.subscribe": "Подпишитесь на нашу рассылку",
    "footer.email": "Ваш email",
    "footer.subscribeBtn": "Подписаться",
    "footer.ourServices": "Наши услуги",
    "footer.quickLinks": "Быстрые ссылки",
    "footer.stayConnected": "Оставайтесь на связи",
    "footer.newsletterDescription":
      "Получайте последние предложения и новости о приключениях.",
    "footer.trustedCertified": "Надежность и сертификация",
    "footer.highestStandards":
      "Мы работаем в соответствии с высшими стандартами безопасности и качества.",
    "footer.licensed": "Лицензированный оператор",
    "footer.insured": "Полностью застраховано",
    "footer.unescoPartner": "Партнер ЮНЕСКО",
    "footer.securePayments": "Безопасные платежи",
    "footer.allRightsReserved": "Все права защищены",
    "footer.description":
      "Ваш пропуск в нетронутую красоту полуострова Камчатка.",
    "footer.licensedOperator": "Лицензированный туроператор",

    // Search
    "search.placeholder": "Искать услуги, туры, места...",
    "search.results": "Результаты поиска",
    "search.noResults": "Ничего не найдено по запросу",
    "search.suggestions": "Возможно, вы искали",
    "search.popular": "Популярные запросы",
    "search.recent": "Недавние запросы",
    "search.clear": "Очистить поиск",
    "search.searchFor": "Искать",
    "search.showing": "Показано",
    "search.placeholderShort": "Поиск...",
    "search.viewAllResultsFor": 'Показать все результаты для "{query}"',
    "search.showingResults": "Показано {start}-{end} из {total} результатов",

    // Currency
    "currency.usd": "Доллар США",
    "currency.eur": "Евро",
    "currency.rub": "Российский рубль",

    // Categories
    "categories.all": "Все категории",
    "categories.hunting": "Охота",
    "categories.fishing": "Рыбалка",
    "categories.recreation": "Базы отдыха",
    "categories.tours": "Туры и экспедиции",
    "categories.adventure": "Экстремальный спорт",
    "categories.wildlife": "Наблюдение за животными",
    "categories.photography": "Фототуры",
    "categories.cultural": "Культурный опыт",

    // share
    "share.copied": "Ссылка скопирована!",
    "share.copyFailed": "Не удалось скопировать.",
    "share.shareFailed": "Не удалось поделиться.",
    "share.native": "Поделиться",
    "share.copyLink": "Копировать ссылку",
    "share.text": "Оцени это невероятное приключение: {title}",

    // Time slots
    "time.morning": "Утро (6:00 - 12:00)",
    "time.afternoon": "День (12:00 - 18:00)",
    "time.evening": "Вечер (18:00 - 22:00)",
    "time.night": "Ночь (22:00 - 6:00)",

    // Difficulty levels
    "difficulty.easy": "Легкий",
    "difficulty.moderate": "Средний",
    "difficulty.hard": "Сложный",
    "difficulty.expert": "Эксперт",

    // Notifications
    "notification.bookingConfirmed": "Ваше бронирование подтверждено",
    "notification.bookingCancelled": "Ваше бронирование отменено",
    "notification.paymentReceived": "Платеж успешно получен",
    "notification.supplierResponse": "Поставщик ответил на ваше бронирование",
    "notification.reminderDayBefore": "Напоминание: ваша поездка завтра",
    "notification.tripCompleted": "Как прошла ваша поездка? Оставьте отзыв",

    // Contact
    "contact.hero.description":
      "Свяжитесь с нашей командой по любым вопросам о вашем приключении на Камчатке или для бронирования индивидуального тура.",
    "contact.form.title": "Отправьте нам сообщение",
    "contact.form.subject": "Тема",
    "contact.form.message": "Сообщение",
    "contact.form.messagePlaceholder": "Расскажите нам о ваших пожеланиях...",
    "contact.form.send": "Отправить сообщение",
    "contact.success":
      "Сообщение успешно отправлено! Мы скоро с вами свяжемся.",
    "contact.error":
      "Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.",
    "contact.info.title": "Контактная информация",
    "contact.info.address": "Адрес",
    "contact.info.hours": "Часы работы",
    "contact.info.weekdays": "Будние дни",
    "contact.info.weekends": "Выходные",
    "contact.info.timezone": "Камчатское время (GMT+12)",
    "contact.emergency.title": "Экстренная связь",
    "contact.emergency.description":
      "Для экстренных случаев во время вашей поездки, используйте эти круглосуточные контакты:",
    "contact.emergency.line": "Экстренная линия",
    "contact.emergency.satellite": "Спутниковый телефон",
    "contact.faq.description":
      "Найдите ответы на часто задаваемые вопросы о наших услугах.",
    "contact.faq.visit": "Перейти к ЧаВо",

    // Static Pages
    "pages.comingSoon": "Скоро",
    "pages.comingSoonDescription":
      "Эта страница в данный момент находится в разработке. Заходите позже за обновлениями.",
    "pages.ourStory.content":
      "Наша история начинается со страсти к приключениям и глубокого уважения к нетронутой дикой природе Камчатки...",
    "pages.team.content":
      "Познакомьтесь с нашей командой опытных гидов и специалистов по приключениям...",
    "pages.careers.content":
      "Присоединяйтесь к нашей команде и помогите другим открыть для себя магию Камчатки...",
    "pages.press.content":
      "Пресс-релизы и информация для СМИ о Kamchatka Adventures...",
    "pages.help.content":
      "Найдите помощь и поддержку для вашего приключения на Камчатке...",
    "pages.faq.content":
      "Часто задаваемые вопросы о наших услугах и направлениях...",
    "pages.safety.content":
      "Безопасность - наш главный приоритет. Узнайте о наших протоколах безопасности и рекомендациях...",
    "pages.terms.content": "Условия и положения использования наших услуг...",
    "pages.privacy.content":
      "Наша политика конфиденциальности и как мы защищаем ваши личные данные...",
    "pages.cookies.content":
      "Информация о том, как мы используем файлы cookie на нашем сайте...",

    // About Page
    "about.hero.description":
      "Мы - увлеченные искатели приключений, посвятившие себя тому, чтобы поделиться невероятной дикой природой Камчатки с исследователями со всего мира.",
    "about.mission.title": "Наша миссия",
    "about.mission.description":
      "Предоставлять исключительные приключения в дикой природе, сохраняя первозданную красоту Камчатки для будущих поколений.",
    "about.mission.details":
      "Мы верим, что приключения и сохранение природы идут рука об руку. Каждая организованная нами экспедиция вносит вклад в местные природоохранные инициативы и практику устойчивого туризма.",
    "about.stats.years": "Лет опыта",
    "about.stats.clients": "Счастливых искателей приключений",
    "about.stats.services": "Приключенческих услуг",
    "about.stats.guides": "Опытных гидов",
    "about.values.title": "Наши ценности",
    "about.values.subtitle":
      "Что вдохновляет нас на создание исключительных впечатлений в дикой природе",
    "about.values.adventure": "Приключения прежде всего",
    "about.values.adventure.desc":
      "Мы создаем незабываемые впечатления, которые расширяют границы",
    "about.values.sustainability": "Экологичность",
    "about.values.sustainability.desc": "Защита природы для будущих поколений",
    "about.values.safety": "Безопасность всегда",
    "about.values.safety.desc": "Ваша безопасность - наш главный приоритет",
    "about.values.service": "Исключительный сервис",
    "about.values.service.desc": "Превзойти ожидания каждого гостя",
    "about.team.description":
      "Наша команда состоит из опытных гидов, специалистов по приключениям и местных экспертов, которые знают Камчатку как никто другой.",
    "about.team.meet": "Познакомиться с командой",
    "about.cta.title": "Готовы к приключениям?",
    "about.cta.description":
      "Присоединяйтесь к тысячам искателей приключений, которые открыли для себя магию Камчатки вместе с нами.",

    // Error messages
    "error.generic": "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",
    "error.network": "Ошибка сети. Проверьте ваше подключение.",
    "error.serverError": "Ошибка сервера. Пожалуйста, попробуйте позже.",
    "error.notFound": "Страница не найдена",
    "error.pageNotFound": "Страница, которую вы ищете, не найдена.",
    "error.unauthorized": "У вас нет прав для доступа к этой странице.",
    "error.forbidden": "Доступ запрещен",
    "error.validation":
      "Пожалуйста, проверьте введенные данные и попробуйте снова.",
    "error.paymentFailed": "Платеж не прошел. Пожалуйста, попробуйте еще раз.",
    "error.bookingFailed":
      "Не удалось забронировать. Пожалуйста, попробуйте еще раз.",
    "error.loginRequired": "Пожалуйста, войдите в систему, чтобы продолжить.",
    "error.categoryNotFound": "Категория не найдена",
    "error.serviceNotFound": "Услуга не найдена",

    // Checkout
    "checkout.completeBooking": "Завершить бронирование",
    "checkout.reviewDetails": "Проверьте свои данные и завершите бронирование.",
    "checkout.bookingSummary": "Сводка бронирования",
    "checkout.subtotal": "Подытог",
    "checkout.serviceFee": "Сервисный сбор",
    "checkout.taxes": "Налоги",
    "checkout.total": "Итого",
    "checkout.securePayment": "Безопасный платеж через Stripe.",
    "checkout.paymentMethod": "Способ оплаты",
    "checkout.contactInfo": "Контактная информация",
    "checkout.termsAgreement":
      "Завершая это бронирование, вы соглашаетесь с нашими Условиями предоставления услуг и Политикой конфиденциальности.",
    "checkout.payNow": "Оплатить сейчас",
    "checkout.bookingSuccess": "Бронирование успешно!",
    "checkout.bookingFailed": "Ошибка бронирования",
    "checkout.paymentFailed":
      "Не удалось обработать платеж. Пожалуйста, попробуйте еще раз.",
    "checkout.bookingConfirmation": "Подтверждение бронирования",
    "checkout.bookingConfirmed": "Бронирование подтверждено!",
    "checkout.confirmationEmailSent":
      "На вашу почту отправлено письмо с деталями бронирования.",

    // Payment
    "payment.card": "Карта",
    "payment.sbp": "СБП",
    "payment.crypto": "Крипто",
    "payment.cardNumber": "Номер карты",
    "payment.expiryDate": "Срок действия",
    "payment.cvv": "CVV",
    "payment.rubPayment": "Только в рублях",
    "payment.sbpRedirect": "Вы будете перенаправлены для завершения платежа.",
    "payment.cryptoPayment": "Оплата криптовалютой",
    "payment.metaMaskConnect": "Подключитесь через MetaMask для оплаты.",
  },

  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.catalog": "Katalog",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "nav.dashboard": "Dashboard",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.logout": "Abmelden",
    "nav.search": "Suchen",
    "nav.menu": "Menü",
    "nav.cart": "Warenkorb",
    "nav.language": "Sprache",
    "nav.currency": "Währung",
    "nav.services": "Dienstleistungen",
    "nav.tours": "Touren",
    "nav.hunting": "Jagd",
    "nav.fishing": "Angeln",
    "nav.recreation": "Erholung",

    // Hero
    "hero.title": "Entdecken Sie Kamtschatka",
    "hero.subtitle": "Unvergessliche Abenteuer im Land der Vulkane",
    "hero.description":
      "Erleben Sie unberührte Wildnis, Vulkanlandschaften und Weltklasse-Abenteueraktivitäten auf Russlands entlegenster Halbinsel.",
    "hero.cta": "Dienste erkunden",
    "hero.ctaSecondary": "Videotour ansehen",
    "hero.stats.services": "Premium-Dienste",
    "hero.stats.guides": "Erfahrene Guides",
    "hero.stats.clients": "Zufriedene Kunden",
    "hero.stats.years": "Jahre Erfahrung",
    "hero.location": "Halbinsel Kamtschatka, Russland",
    "hero.trustIndicator": "Lizenziert & Versichert",

    // Services Section
    "services.title": "Wählen Sie Ihr Abenteuer",
    "services.subtitle":
      "Entdecken Sie unsere erstklassigen Abenteuertourismus-Dienstleistungen",
    "services.hunting": "Jagd",
    "services.fishing": "Angeln",
    "services.recreation": "Erholungszentren",
    "services.tours": "Touren & Expeditionen",
    "services.hunting.desc":
      "Weltklasse-Jagdexpeditionen mit erfahrenen Führern",
    "services.fishing.desc":
      "Erstklassige Angelerlebnisse in unberührten Gewässern",
    "services.recreation.desc":
      "Luxuriöse Unterkünfte und Wellnesseinrichtungen",
    "services.tours.desc":
      "Geführte Touren zu den spektakulärsten Orten Kamtschatkas",
    "services.viewAll": "Alle Dienste anzeigen",
    "services.bookNow": "Jetzt buchen",
    "services.learnMore": "Mehr erfahren",
    "services.exploreAdventures": "Abenteuer erkunden",
    "services.allServicesTitle": "Alle Dienstleistungen",
    "services.allServicesSubtitle":
      "Entdecken Sie unsere gesamte Kollektion von Abenteuern in der Wildnis.",

    // History Section
    "history.title": "Erleben Sie die Wildnis",
    "history.subtitle":
      "Die Halbinsel Kamtschatka bietet einige der unberührtesten Wildniserlebnisse der Welt",
    "history.description":
      "Kamtschatka ist die Heimat der größten Braunbären der Welt, aktiver Vulkane und unberührter Landschaften und ein unvergleichliches Reiseziel. Unsere erfahrenen Führer und erstklassigen Dienstleistungen sorgen dafür, dass Ihr Abenteuer sicher und unvergesslich wird.",
    "history.features.wildlife": "Einzigartige Tierwelt",
    "history.features.volcanoes": "Aktive Vulkane",
    "history.features.fishing": "Weltklasse-Angeln",
    "history.features.guides": "Erfahrene Führer",

    // Service Catalog
    "catalog.title": "Unsere Dienstleistungen",
    "catalog.filter": "Filter",
    "catalog.filterBy": "Filtern nach",
    "catalog.sort": "Sortieren nach",
    "catalog.sortBy": "Sortieren nach",
    "catalog.category": "Kategorie",
    "catalog.price": "Preis",
    "catalog.duration": "Dauer",
    "catalog.difficulty": "Schwierigkeit",
    "catalog.rating": "Bewertung",
    "catalog.location": "Ort",
    "catalog.availability": "Verfügbarkeit",
    "catalog.from": "Von",
    "catalog.to": "Bis",
    "catalog.reset": "Filter zurücksetzen",
    "catalog.apply": "Anwenden",
    "catalog.results": "Ergebnisse gefunden",
    "catalog.noResults": "Keine Dienste gefunden",
    "catalog.loadMore": "Weitere Dienste laden",
    "catalog.showLess": "Weniger anzeigen",
    "catalog.perPerson": "pro Person",
    "catalog.days": "Tage",
    "catalog.hours": "Stunden",
    "catalog.addToCart": "In den Warenkorb",
    "catalog.addToFavorites": "Zu Favoriten hinzufügen",
    "catalog.removeFromFavorites": "Aus Favoriten entfernen",
    "catalog.share": "Teilen",
    "catalog.viewDetails": "Details anzeigen",
    "catalog.bookNow": "Jetzt buchen",
    "catalog.reviews": "Bewertungen",
    "catalog.available": "Verfügbar",
    "catalog.unavailable": "Nicht verfügbar",
    "catalog.soldOut": "Ausverkauft",
    "catalog.highestRated": "Höchste Bewertung",
    "catalog.mostReviewed": "Am meisten bewertet",
    "catalog.priceLowHigh": "Preis: Niedrig bis Hoch",
    "catalog.priceHighLow": "Preis: Hoch bis Niedrig",
    "catalog.alphabetical": "Alphabetisch",
    "catalog.newestFirst": "Neueste zuerst",
    "catalog.clearFilters": "Filter löschen",

    // imageCarousel
    "imageCarousel.alt": "{title} - Bild {index}",

    // Booking
    "booking.title": "Buchen Sie Ihr Abenteuer",
    "booking.selectDates": "Daten auswählen",
    "booking.selectTime": "Zeit auswählen",
    "booking.selectGuests": "Gäste auswählen",
    "booking.adults": "Erwachsene",
    "booking.children": "Kinder",
    "booking.infants": "Kleinkinder",
    "booking.morning": "Morgen",
    "booking.afternoon": "Nachmittag",
    "booking.evening": "Abend",
    "booking.night": "Nacht",
    "booking.availableDates": "Verfügbare Daten",
    "booking.unavailableDates": "Nicht verfügbare Daten",
    "booking.selectDate": "Bitte wählen Sie ein Datum",
    "booking.selectTimeSlot": "Bitte wählen Sie eine Zeit",
    "booking.serviceDetails": "Servicedetails",
    "booking.totalPrice": "Gesamtpreis",
    "booking.priceBreakdown": "Preisaufschlüsselung",
    "booking.basePrice": "Grundpreis",
    "booking.taxes": "Steuern & Gebühren",
    "booking.discount": "Rabatt",
    "booking.deposit": "Anzahlung erforderlich",
    "booking.fullPayment": "Vollständige Zahlung",
    "booking.paymentMethod": "Zahlungsmethode",
    "booking.contactInfo": "Kontaktinformationen",
    "booking.specialRequests": "Sonderwünsche",
    "booking.terms": "Nutzungsbedingungen",
    "booking.privacy": "Datenschutzrichtlinie",
    "booking.agree": "Ich stimme den",
    "booking.and": "und",
    "booking.confirmBooking": "Buchung bestätigen",
    "booking.processing": "Wird verarbeitet...",
    "booking.success": "Buchung erfolgreich bestätigt!",
    "booking.error": "Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "booking.pending": "Ausstehend",
    "booking.confirmed": "Bestätigt",
    "booking.completed": "Abgeschlossen",
    "booking.cancelled": "Storniert",
    "booking.rejected": "Abgelehnt",
    "booking.supplierResponse": "Warte auf Antwort des Anbieters",
    "booking.supplierTimeout":
      "Zeitüberschreitung bei der Antwort des Anbieters",

    // Cart
    "cart.title": "Warenkorb",
    "cart.empty": "Ihr Warenkorb ist leer",
    "cart.items": "Artikel",
    "cart.item": "Artikel",
    "cart.subtotal": "Zwischensumme",
    "cart.total": "Gesamt",
    "cart.remove": "Entfernen",
    "cart.update": "Aktualisieren",
    "cart.checkout": "Zur Kasse gehen",
    "cart.continueShopping": "Weiter einkaufen",
    "cart.addedToCart": "Zum Warenkorb hinzugefügt",
    "cart.removedFromCart": "Aus dem Warenkorb entfernt",
    "cart.updatedCart": "Warenkorb aktualisiert",
    "cart.clearCart": "Warenkorb leeren",
    "cart.saveForLater": "Für später speichern",

    // Dashboard
    "dashboard.title": "Mein Dashboard",
    "dashboard.profile": "Profil",
    "dashboard.bookings": "Meine Buchungen",
    "dashboard.balance": "Guthaben",
    "dashboard.referrals": "Empfehlungen",
    "dashboard.settings": "Einstellungen",
    "dashboard.favorites": "Favoriten",
    "dashboard.welcome": "Willkommen zurück",
    "dashboard.points": "Punkte",
    "dashboard.totalBookings": "Buchungen insgesamt",
    "dashboard.activeBookings": "Aktive Buchungen",
    "dashboard.completedBookings": "Abgeschlossen",
    "dashboard.upcomingBookings": "Bevorstehend",
    "dashboard.recentActivity": "Letzte Aktivitäten",
    "dashboard.quickActions": "Schnellaktionen",
    "dashboard.viewAllBookings": "Alle Buchungen anzeigen",
    "dashboard.topUpBalance": "Guthaben aufladen",
    "dashboard.inviteFriends": "Freunde einladen",
    "dashboard.editProfile": "Profil bearbeiten",

    // Profile
    "profile.title": "Mein Profil",
    "profile.personalInfo": "Persönliche Informationen",
    "profile.name": "Vollständiger Name",
    "profile.email": "E-Mail",
    "profile.phone": "Telefon",
    "profile.country": "Land",
    "profile.language": "Sprache",
    "profile.currency": "Währung",
    "profile.preferences": "Einstellungen",
    "profile.notifications": "Benachrichtigungen",
    "profile.emailNotifications": "E-Mail-Benachrichtigungen",
    "profile.smsNotifications": "SMS-Benachrichtigungen",
    "profile.marketing": "Marketingmitteilungen",
    "profile.updateSuccess": "Profil erfolgreich aktualisiert",
    "profile.updateError": "Profil konnte nicht aktualisiert werden",
    "profile.passwordChange": "Passwort ändern",
    "profile.currentPassword": "Aktuelles Passwort",
    "profile.newPassword": "Neues Passwort",
    "profile.confirmPassword": "Neues Passwort bestätigen",
    "profile.deleteAccount": "Konto löschen",
    "profile.deleteWarning":
      "Diese Aktion kann nicht rückgängig gemacht werden",

    // Authentication
    "auth.login": "Anmelden",
    "auth.signup": "Registrieren",
    "auth.logout": "Abmelden",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.confirmPassword": "Passwort bestätigen",
    "auth.firstName": "Vorname",
    "auth.lastName": "Nachname",
    "auth.forgotPassword": "Passwort vergessen?",
    "auth.resetPassword": "Passwort zurücksetzen",
    "auth.createAccount": "Konto erstellen",
    "auth.haveAccount": "Haben Sie bereits ein Konto?",
    "auth.noAccount": "Haben Sie kein Konto?",
    "auth.signInWith": "Anmelden mit",
    "auth.signUpWith": "Registrieren mit",
    "auth.google": "Google",
    "auth.facebook": "Facebook",
    "auth.or": "oder",
    "auth.terms": "Nutzungsbedingungen",
    "auth.privacy": "Datenschutzrichtlinie",
    "auth.agreeTerms":
      "Ich stimme den Nutzungsbedingungen und der Datenschutzrichtlinie zu",
    "auth.success": "Erfolgreich angemeldet",
    "auth.error": "Authentifizierung fehlgeschlagen",
    "auth.emailSent": "E-Mail zum Zurücksetzen gesendet",
    "auth.invalidCredentials": "Ungültige E-Mail oder ungültiges Passwort",
    "auth.accountExists": "Konto existiert bereits",

    // Common
    "common.loading": "Wird geladen...",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.edit": "Bearbeiten",
    "common.delete": "Löschen",
    "common.view": "Anzeigen",
    "common.book": "Jetzt buchen",
    "common.price": "Preis",
    "common.date": "Datum",
    "common.duration": "Dauer",
    "common.guests": "Gäste",
    "common.total": "Gesamt",
    "common.close": "Schließen",
    "common.back": "Zurück",
    "common.next": "Weiter",
    "common.previous": "Zurück",
    "common.submit": "Senden",
    "common.confirm": "Bestätigen",
    "common.yes": "Ja",
    "common.no": "Nein",
    "common.ok": "OK",
    "common.error": "Fehler",
    "common.success": "Erfolg",
    "common.warning": "Warnung",
    "common.info": "Information",
    "common.required": "Erforderlich",
    "common.optional": "Optional",
    "common.select": "Auswählen",
    "common.all": "Alle",
    "common.none": "Keine",
    "common.more": "Mehr",
    "common.less": "Weniger",
    "common.show": "Anzeigen",
    "common.hide": "Verbergen",
    "common.search": "Suchen",
    "common.filter": "Filter",
    "common.sort": "Sortieren",
    "common.clear": "Löschen",
    "common.apply": "Anwenden",
    "common.reset": "Zurücksetzen",
    "common.scroll": "Scrollen zum Entdecken",
    "common.rating": "Bewertung",
    "common.premium": "Premium",
    "common.popular": "Beliebt",
    "common.luxury": "Luxus",
    "common.adventure": "Abenteuer",
    "common.hello": "Hallo",
    "common.brandName": "Kamtschatka",
    "common.tagline": "Wilde Abenteuer",
    "common.explore": "Erkunden",
    "common.account": "Konto",
    "common.filters": "Filter",
    "common.gridView": "Gitteransicht",
    "common.listView": "Listenansicht",
    "common.zoomIn": "Vergrößern",
    "common.noImages": "Keine Bilder verfügbar",
    "common.videoNotSupported": "Ihr Browser unterstützt das Video-Tag nicht.",
    "common.featured": "Empfohlen",
    "common.by": "von",
    "common.of": "von",
    "common.continueExploring": "Weiter erkunden",
    "common.fullName": "Vollständiger Name",
    "common.phone": "Telefon",
    "common.country": "Land",
    "common.address": "Adresse",
    "common.subscribe": "Abonnieren",
    "common.processing": "Verarbeitung...",
    "common.cart": "Warenkorb",

    // Footer
    "footer.company": "Unternehmen",
    "footer.about": "Über uns",
    "footer.ourStory": "Unsere Geschichte",
    "footer.team": "Unser Team",
    "footer.careers": "Karriere",
    "footer.press": "Presse",
    "footer.services": "Dienstleistungen",
    "footer.hunting": "Jagd",
    "footer.fishing": "Angeln",
    "footer.recreation": "Erholung",
    "footer.tours": "Touren",
    "footer.support": "Unterstützung",
    "footer.help": "Hilfezentrum",
    "footer.contact": "Kontaktieren Sie uns",
    "footer.faq": "FAQ",
    "footer.safety": "Sicherheit",
    "footer.legal": "Rechtliches",
    "footer.terms": "Nutzungsbedingungen",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.cookies": "Cookie-Richtlinie",
    "footer.copyright": "Alle Rechte vorbehalten",
    "footer.followUs": "Folgen Sie uns",
    "footer.newsletter": "Newsletter",
    "footer.subscribe": "Abonnieren Sie unseren Newsletter",
    "footer.email": "Ihre E-Mail",
    "footer.subscribeBtn": "Abonnieren",
    "footer.ourServices": "Unsere Dienstleistungen",
    "footer.quickLinks": "Schnellinks",
    "footer.stayConnected": "In Verbindung bleiben",
    "footer.newsletterDescription":
      "Erhalten Sie die neuesten Angebote und Abenteuernachrichten.",
    "footer.trustedCertified": "Vertrauenswürdig & Zertifiziert",
    "footer.highestStandards":
      "Wir arbeiten nach den höchsten Sicherheits- und Qualitätsstandards.",
    "footer.licensed": "Lizenzierter Betreiber",
    "footer.insured": "Vollständig versichert",
    "footer.unescoPartner": "UNESCO-Partner",
    "footer.securePayments": "Sichere Zahlungen",
    "footer.allRightsReserved": "Alle Rechte vorbehalten",
    "footer.description":
      "Ihr Tor zur ungezähmten Schönheit der Halbinsel Kamtschatka.",
    "footer.licensedOperator": "Lizenzierter Reiseveranstalter",

    // Search
    "search.placeholder": "Dienste, Touren, Orte suchen...",
    "search.results": "Suchergebnisse",
    "search.noResults": "Keine Ergebnisse gefunden für",
    "search.suggestions": "Vorschläge",
    "search.popular": "Beliebte Suchen",
    "search.recent": "Letzte Suchen",
    "search.clear": "Suche löschen",
    "search.searchFor": "Suchen nach",
    "search.showing": "Zeige",
    "search.placeholderShort": "Suchen...",
    "search.viewAllResultsFor": 'Alle Ergebnisse für "{query}" anzeigen',
    "search.showingResults": "Zeige {start}-{end} von {total} Ergebnissen",

    // Currency
    "currency.usd": "US-Dollar",
    "currency.eur": "Euro",
    "currency.rub": "Russischer Rubel",

    // Categories
    "categories.all": "Alle Kategorien",
    "categories.hunting": "Jagd",
    "categories.fishing": "Angeln",
    "categories.recreation": "Erholungszentren",
    "categories.tours": "Touren & Expeditionen",
    "categories.adventure": "Abenteuersport",
    "categories.wildlife": "Wildtierbeobachtung",
    "categories.photography": "Fototouren",
    "categories.cultural": "Kulturelle Erlebnisse",

    // share
    "share.copied": "Link kopiert!",
    "share.copyFailed": "Kopieren fehlgeschlagen.",
    "share.shareFailed": "Teilen fehlgeschlagen.",
    "share.native": "Teilen",
    "share.copyLink": "Link kopieren",
    "share.text": "Schau dir dieses tolle Abenteuer an: {title}",

    // Time slots
    "time.morning": "Morgen (6:00 - 12:00)",
    "time.afternoon": "Nachmittag (12:00 - 18:00)",
    "time.evening": "Abend (18:00 - 22:00)",
    "time.night": "Nacht (22:00 - 6:00)",

    // Difficulty levels
    "difficulty.easy": "Leicht",
    "difficulty.moderate": "Mittel",
    "difficulty.hard": "Schwer",
    "difficulty.expert": "Experte",

    // Notifications
    "notification.bookingConfirmed": "Ihre Buchung wurde bestätigt",
    "notification.bookingCancelled": "Ihre Buchung wurde storniert",
    "notification.paymentReceived": "Zahlung erfolgreich erhalten",
    "notification.supplierResponse":
      "Anbieter hat auf Ihre Buchung geantwortet",
    "notification.reminderDayBefore": "Erinnerung: Ihre Reise ist morgen",
    "notification.tripCompleted":
      "Wie war Ihre Reise? Hinterlassen Sie eine Bewertung",

    // Contact
    "contact.hero.description":
      "Kontaktieren Sie unser Team bei Fragen zu Ihrem Kamtschatka-Abenteuer oder um eine individuelle Erfahrung zu buchen.",
    "contact.form.title": "Senden Sie uns eine Nachricht",
    "contact.form.subject": "Betreff",
    "contact.form.message": "Nachricht",
    "contact.form.messagePlaceholder":
      "Erzählen Sie uns von Ihren Abenteuerwünschen...",
    "contact.form.send": "Nachricht senden",
    "contact.success":
      "Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.",
    "contact.error":
      "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    "contact.info.title": "Kontaktinformationen",
    "contact.info.address": "Adresse",
    "contact.info.hours": "Öffnungszeiten",
    "contact.info.weekdays": "Wochentage",
    "contact.info.weekends": "Wochenenden",
    "contact.info.timezone": "Kamtschatka-Zeit (GMT+12)",
    "contact.emergency.title": "Notfallkontakt",
    "contact.emergency.description":
      "Für Notfälle während Ihrer Reise nutzen Sie bitte diese 24/7-Kontakte:",
    "contact.emergency.line": "Notfall-Hotline",
    "contact.emergency.satellite": "Satellitentelefon",
    "contact.faq.description":
      "Hier finden Sie Antworten auf häufig gestellte Fragen zu unseren Dienstleistungen.",
    "contact.faq.visit": "Zur FAQ-Seite",

    // Static Pages
    "pages.comingSoon": "Demnächst verfügbar",
    "pages.comingSoonDescription":
      "Diese Seite befindet sich derzeit im Aufbau. Schauen Sie bald wieder für Updates vorbei.",
    "pages.ourStory.content":
      "Unsere Geschichte beginnt mit einer Leidenschaft für Abenteuer und einem tiefen Respekt für die unberührte Wildnis von Kamtschatka...",
    "pages.team.content":
      "Lernen Sie unser Team aus erfahrenen Guides und Abenteuerspezialisten kennen...",
    "pages.careers.content":
      "Werden Sie Teil unseres Teams und helfen Sie anderen, die Magie von Kamtschatka zu entdecken...",
    "pages.press.content":
      "Pressemitteilungen und Medieninformationen über Kamchatka Adventures...",
    "pages.help.content":
      "Hier finden Sie Hilfe und Unterstützung für Ihr Kamtschatka-Abenteuer...",
    "pages.faq.content":
      "Häufig gestellte Fragen zu unseren Dienstleistungen und Reisezielen...",
    "pages.safety.content":
      "Sicherheit hat für uns oberste Priorität. Erfahren Sie mehr über unsere Sicherheitsprotokolle und Richtlinien...",
    "pages.terms.content":
      "Allgemeine Geschäftsbedingungen für die Nutzung unserer Dienste...",
    "pages.privacy.content":
      "Unsere Datenschutzrichtlinie und wie wir Ihre persönlichen Daten schützen...",
    "pages.cookies.content":
      "Informationen darüber, wie wir Cookies auf unserer Website verwenden...",

    // About Page
    "about.hero.description":
      "Wir sind leidenschaftliche Abenteurer, die es sich zur Aufgabe gemacht haben, die unglaubliche Wildnis Kamtschatkas mit Entdeckern aus aller Welt zu teilen.",
    "about.mission.title": "Unsere Mission",
    "about.mission.description":
      "Außergewöhnliche Wildnisabenteuer zu bieten und gleichzeitig die unberührte Schönheit Kamtschatkas für zukünftige Generationen zu bewahren.",
    "about.mission.details":
      "Wir glauben, dass Abenteuer und Naturschutz Hand in Hand gehen. Jede von uns organisierte Expedition trägt zu lokalen Naturschutzbemühungen und nachhaltigen Tourismuspraktiken bei.",
    "about.stats.years": "Jahre Erfahrung",
    "about.stats.clients": "Zufriedene Abenteurer",
    "about.stats.services": "Abenteuer-Dienstleistungen",
    "about.stats.guides": "Experten-Guides",
    "about.values.title": "Unsere Werte",
    "about.values.subtitle":
      "Was uns antreibt, außergewöhnliche Wildniserlebnisse zu schaffen",
    "about.values.adventure": "Abenteuer zuerst",
    "about.values.adventure.desc":
      "Wir schaffen unvergessliche Erlebnisse, die Grenzen überschreiten",
    "about.values.sustainability": "Nachhaltigkeit",
    "about.values.sustainability.desc":
      "Die Natur für zukünftige Generationen schützen",
    "about.values.safety": "Sicherheit geht vor",
    "about.values.safety.desc": "Ihre Sicherheit hat für uns oberste Priorität",
    "about.values.service": "Außergewöhnlicher Service",
    "about.values.service.desc": "Für jeden Gast gehen wir die Extrameile",
    "about.team.description":
      "Unser Team besteht aus erfahrenen Guides, Abenteuerspezialisten und lokalen Experten, die Kamtschatka wie kein anderer kennen.",
    "about.team.meet": "Lernen Sie unser Team kennen",
    "about.cta.title": "Bereit für Ihr Abenteuer?",
    "about.cta.description":
      "Schließen Sie sich Tausenden von Abenteurern an, die mit uns die Magie Kamtschatkas entdeckt haben.",

    // Error messages
    "error.generic": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    "error.network": "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.",
    "error.serverError": "Serverfehler. Bitte versuchen Sie es später erneut.",
    "error.notFound": "Seite nicht gefunden",
    "error.pageNotFound":
      "Die von Ihnen gesuchte Seite konnte nicht gefunden werden.",
    "error.unauthorized":
      "Sie sind nicht berechtigt, auf diese Seite zuzugreifen.",
    "error.forbidden": "Zugriff verweigert",
    "error.validation":
      "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.",
    "error.paymentFailed":
      "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "error.bookingFailed":
      "Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "error.loginRequired": "Bitte melden Sie sich an, um fortzufahren.",
    "error.categoryNotFound": "Kategorie nicht gefunden",
    "error.serviceNotFound": "Dienst nicht gefunden",

    // Checkout
    "checkout.completeBooking": "Buchung abschließen",
    "checkout.reviewDetails":
      "Überprüfen Sie Ihre Angaben und schließen Sie Ihre Buchung ab.",
    "checkout.bookingSummary": "Buchungsübersicht",
    "checkout.subtotal": "Zwischensumme",
    "checkout.serviceFee": "Servicegebühr",
    "checkout.taxes": "Steuern",
    "checkout.total": "Gesamt",
    "checkout.securePayment": "Sichere Zahlung mit Stripe.",
    "checkout.paymentMethod": "Zahlungsmethode",
    "checkout.contactInfo": "Kontaktinformationen",
    "checkout.termsAgreement":
      "Mit Abschluss dieser Buchung stimmen Sie unseren Nutzungsbedingungen und unserer Datenschutzrichtlinie zu.",
    "checkout.payNow": "Jetzt bezahlen",
    "checkout.bookingSuccess": "Buchung erfolgreich!",
    "checkout.bookingFailed": "Buchung fehlgeschlagen",
    "checkout.paymentFailed":
      "Zahlungsabwicklung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "checkout.bookingConfirmation": "Buchungsbestätigung",
    "checkout.bookingConfirmed": "Buchung bestätigt!",
    "checkout.confirmationEmailSent":
      "Eine Bestätigungs-E-Mail mit Ihren Buchungsdetails wurde gesendet.",

    // Payment
    "payment.card": "Karte",
    "payment.sbp": "SBP",
    "payment.crypto": "Krypto",
    "payment.cardNumber": "Kartennummer",
    "payment.expiryDate": "Ablaufdatum",
    "payment.cvv": "CVV",
    "payment.rubPayment": "Nur RUB-Zahlung",
    "payment.sbpRedirect":
      "Sie werden weitergeleitet, um Ihre Zahlung abzuschließen.",
    "payment.cryptoPayment": "Kryptozahlung",
    "payment.metaMaskConnect": "Mit MetaMask verbinden, um zu bezahlen.",
  },
};

type Language = "en" | "ru" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("ru")) return "ru";
  if (browserLang.startsWith("de")) return "de";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (
    key: string,
    options?: { [key: string]: string | number }
  ): string => {
    let translation = translations[language]?.[key] || key;
    if (options) {
      Object.keys(options).forEach((optionKey) => {
        const regex = new RegExp(`{${optionKey}}`, "g");
        translation = translation.replace(regex, String(options[optionKey]));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
