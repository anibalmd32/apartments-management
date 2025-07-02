export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    apartments: 'Apartments',
    tenants: 'Tenants',
    payments: 'Payments',
    login: 'Login',
    logout: 'Logout',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    
    // Authentication
    email: 'Email',
    password: 'Password',
    welcomeBack: 'Welcome Back',
    signIn: 'Sign In',
    
    // Dashboard
    availableApartments: 'Available Apartments',
    totalTenants: 'Total Tenants',
    pendingPayments: 'Pending Payments',
    monthlyRevenue: 'Monthly Revenue',
    recentActivity: 'Recent Activity',
    
    // Apartments
    addApartment: 'Add New Apartment',
    apartmentDetails: 'Apartment Details',
    monthlyRent: 'Monthly Rent',
    viewingFee: 'Right to View Fee',
    address: 'Address',
    apartmentNumber: 'Apartment Number',
    buildingName: 'Building Name',
    dimensions: 'Dimensions',
    photos: 'Photos',
    rentThisApartment: 'Rent This Apartment',
    payRightToView: 'Pay Right to View',
    nearMe: 'Near Me',
    
    // Tenants
    rightToViewPayments: 'Right to View Payments',
    currentTenants: 'Current Tenants',
    paymentHistory: 'Payment History',
    digitalContract: 'Digital Contract',
    nextPaymentDue: 'Next Payment Due',
    
    // Payments
    payNow: 'Pay Now',
    paymentSummary: 'Payment Summary',
    cardDetails: 'Card Details',
    payWithPayPal: 'Pay with PayPal',
    contractSigning: 'Contract Signing',
    agreeToTerms: 'I agree to the terms and conditions',
    signContract: 'Sign Contract',

    // Geolocation
    geolocationDenied: 'Location access was denied. Please enable location services to find apartments near you.',
    geolocationNotSupported: 'Location services are not supported by your browser.',
    geolocationUnavailable: 'Your location is currently unavailable. Please try again later.',
    geolocationTimeout: 'Location request timed out. Please try again.',
    geolocationError: 'An error occurred while getting your location. Please try again.',
    locationFound: 'Location found! Searching for apartments near you.',
  },
  es: {
    // Navigation
    dashboard: 'Panel',
    apartments: 'Apartamentos',
    tenants: 'Inquilinos',
    payments: 'Pagos',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    
    // Common
    search: 'Buscar',
    filter: 'Filtrar',
    add: 'Agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    view: 'Ver',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    
    // Authentication
    email: 'Correo',
    password: 'Contraseña',
    welcomeBack: 'Bienvenido de Vuelta',
    signIn: 'Iniciar Sesión',
    
    // Dashboard
    availableApartments: 'Apartamentos Disponibles',
    totalTenants: 'Total de Inquilinos',
    pendingPayments: 'Pagos Pendientes',
    monthlyRevenue: 'Ingresos Mensuales',
    recentActivity: 'Actividad Reciente',
    
    // Apartments
    addApartment: 'Agregar Nuevo Apartamento',
    apartmentDetails: 'Detalles del Apartamento',
    monthlyRent: 'Renta Mensual',
    viewingFee: 'Tarifa de Derecho a Ver',
    address: 'Dirección',
    apartmentNumber: 'Número de Apartamento',
    buildingName: 'Nombre del Edificio',
    dimensions: 'Dimensiones',
    photos: 'Fotos',
    rentThisApartment: 'Rentar Este Apartamento',
    payRightToView: 'Pagar Derecho a Ver',
    nearMe: 'Cerca de Mí',
    
    // Tenants
    rightToViewPayments: 'Pagos de Derecho a Ver',
    currentTenants: 'Inquilinos Actuales',
    paymentHistory: 'Historial de Pagos',
    digitalContract: 'Contrato Digital',
    nextPaymentDue: 'Próximo Pago Vence',
    
    // Payments
    payNow: 'Pagar Ahora',
    paymentSummary: 'Resumen de Pago',
    cardDetails: 'Detalles de Tarjeta',
    payWithPayPal: 'Pagar con PayPal',
    contractSigning: 'Firma de Contrato',
    agreeToTerms: 'Acepto los términos y condiciones',
    signContract: 'Firmar Contrato',

    // Geolocation
    geolocationDenied: 'Se denegó el acceso a la ubicación. Por favor, habilite los servicios de ubicación para encontrar apartamentos cerca de usted.',
    geolocationNotSupported: 'Los servicios de ubicación no son compatibles con su navegador.',
    geolocationUnavailable: 'Su ubicación no está disponible actualmente. Por favor, inténtelo de nuevo más tarde.',
    geolocationTimeout: 'La solicitud de ubicación expiró. Por favor, inténtelo de nuevo.',
    geolocationError: 'Ocurrió un error al obtener su ubicación. Por favor, inténtelo de nuevo.',
    locationFound: '¡Ubicación encontrada! Buscando apartamentos cerca de usted.',
  },
};

export const t = (key: keyof typeof translations.en, language: 'en' | 'es') => {
  return translations[language][key] || translations.en[key];
};