import React, { useState, useContext, useEffect } from 'react';
import './index.css';
import BookingPage from './BookingPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import CortesPage from './CortesPage';
import RewardsPage from './RewardsPage';
import RegisterPage from './RegisterPage';
import EditProfilePage from './EditProfilePage';
import HistoryPage from './HistoryPage';
import InvitePage from './InvitePage';
import BarberosPage from './BarberosPage';
import CursosPage from './CursosPage';
import CataloguePage from './CataloguePage';
import ReferralPage from './ReferralPage';
import BarberDashboard from './BarberDashboard';
import FigaroChat from './FigaroChat';
import NotificationsPage from './NotificationsPage';
import AndromedaFooter from './AndromedaFooter';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

// 💡 URL DE WHATSAPP PARA CONTACTO
const WHATSAPP_CONTACT_URL = 'https://wa.link/xeqmvc';
const WHATSAPP_MESSAGE_URL = 'https://api.whatsapp.com/message/I5DDZI3PJM45H1?autoload=1&app_absent=0';

// 🚀 Datos de las secciones destacadas (HIGHLIGHTS)
export const HIGHLIGHTS = [
  {
    icon: '✂️',
    title: 'Tipos de Cortes',
    text: 'Explora nuestra galería de estilos. Desde el clásico fade hasta el moderno crop.',
    page: 'cortes'
  },
  {
    icon: '💲',
    title: 'Sistema de Puntos BarberCoins!',
    text: 'Acumula puntos con cada visita y canjéalos por descuentos, premios y servicios exclusivos.',
    page: 'rewards'
  },
  {
    icon: '🎁',
    title: 'Tienda de Canje',
    text: '¡Canjea tus BarberCoins! Descuentos, perfumes, productos y más.',
    page: 'catalogue'
  },
  {
    icon: '👥',
    title: '¡Invita y Gana!',
    text: 'Gana 5,000 BarberCoins por cada amigo que traigas. ¡Es fácil y rápido!',
    page: 'referral'
  },
  {
    icon: '📅',
    title: 'Reservas Rápidas',
    text: 'Selecciona tu servicio y barbero favorito en menos de 30 segundos, ¡sin esperas!',
    page: 'booking'
  },
  {
    icon: '🧑',
    title: 'Barberos',
    text: 'Conoce a nuestro equipo de profesionales. Experiencia, calidad y el mejor trato.',
    page: 'barberos'
  },
  {
    icon: '📚',
    title: 'Cursos de Barbería',
    text: 'Aprende de los mejores. Cursos profesionales con material en PDF y certificado incluido.',
    page: 'cursos'
  },
  {
    icon: '💻',
    title: '¡Quiero Mi Página Web!',
    text: 'Si tenes un negocio y queres mejorar tu branding digital, contáctame y encontremos una solución!',
    page: 'whatsapp-web'
  },
];


const HomePage = ({ onGoToBooking, onGoToLogin, onGoToCortes, onGoToRewards, onGoToCatalogue, onGoToBarberos, onGoToCursos, onGoToReferral, isLoggedIn, user }) => {
  const logoSource = '/logo_barber233.png';
  const coinFrontSource = '/coin_front.png';
  const coinBackSource = '/coin_back.png';

  const handleHighlightClick = (page) => {
    if (page === 'cortes') {
      onGoToCortes();
    } else if (page === 'booking') {
      onGoToBooking();
    } else if (page === 'rewards') {
      onGoToRewards();
    } else if (page === 'catalogue') {
      onGoToCatalogue();
    } else if (page === 'referral') {
      onGoToReferral();
    } else if (page === 'whatsapp-web') {
      window.open(WHATSAPP_CONTACT_URL, '_blank');
    } else if (page === 'barberos') {
      onGoToBarberos();
    } else if (page === 'cursos') {
      onGoToCursos();
    } else {
      alert(`Acción para ${page || 'este servicio'} en desarrollo.`);
    }
  };


  return (
    <>
      <div className="landing-hero card hero-animated" style={{ maxWidth: 900 }}>
        <img
          src={logoSource}
          alt="Logo de BARBER233"
          className="landing-logo logo-animated"
        />

        <div className="h-title fade-in-up">BARBER233</div>
        <div className="h-sub fade-in-up delay-1">Cortes clásicos. Barbas épicas. Reservá tu turno en segundos.</div>

        <div className="cta-group">
          <button className="btn btn-primary" onClick={onGoToBooking}>
            RESERVAR TURNO HOY
          </button>
          {isLoggedIn ? (
            <button className="btn btn-ghost" onClick={() => onGoToLogin()}>
              MI CUENTA ({user?.displayName || 'Usuario'})
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={onGoToLogin}>
              INICIAR SESIÓN / REGISTRARME
            </button>
          )}
        </div>

        <button
          className="btn btn-ghost"
          onClick={onGoToRewards}
          style={{
            marginTop: '10px',
            marginBottom: '5px',
            fontSize: '1rem',
            padding: '12px 25px',
            background: 'var(--color-dark)',
            color: 'var(--color-white)',
            borderColor: 'var(--color-dark)',
          }}
        >
          ¡BarberCoins y Recompensas! 🚀
        </button>

        <button
          className="btn btn-ghost"
          onClick={onGoToReferral}
          style={{
            marginTop: '5px',
            marginBottom: '5px',
            fontSize: '1rem',
            padding: '10px 20px',
            background: '#6A8047',
            color: 'white',
            borderColor: '#6A8047',
            fontWeight: 'bold'
          }}
        >
          👥 ¡INVITA Y GANA!
        </button>

        <a
          href="https://linktr.ee/Barber233"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{
            marginTop: '5px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            padding: '8px 20px',
            textDecoration: 'none',
            background: 'var(--color-medium-gray)',
            color: 'var(--color-white)',
            borderColor: 'var(--color-medium-gray)',
          }}
        >
          📲 VER REDES Y CONTACTOS
        </a>

        <div className="coin-group">
          <img
            src={coinFrontSource}
            alt="BarberCoin Cara"
            className="coin-image-small coin-spin"
            onClick={onGoToRewards}
          />
          <img
            src={coinBackSource}
            alt="BarberCoin Cruz"
            className="coin-image-small coin-spin-reverse"
            onClick={onGoToRewards}
          />
        </div>

        <a
          href={WHATSAPP_MESSAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{
            marginTop: '10px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            padding: '8px 18px',
            textDecoration: 'none',
            background: 'var(--color-charcoal)',
            color: 'var(--color-white)',
            borderColor: 'var(--color-charcoal)',
            boxShadow: 'none',
          }}
        >
          ENVIAR MENSAJE POR WHATSAPP 💬
        </a>

      </div>

      <div className="landing-grid">
        {HIGHLIGHTS.map((item, index) => {
          const isClickable = ['cortes', 'booking', 'rewards', 'catalogue', 'barberos', 'cursos', 'whatsapp-web', 'referral'].includes(item.page);

          return (
            <div
              key={index}
              className="highlight-card card"
              onClick={isClickable ? () => handleHighlightClick(item.page) : null}
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
            >
              <div className="highlight-icon">
                {item.icon}
              </div>
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-text">{item.text}</p>
            </div>
          );
        })}
      </div>

      <AndromedaFooter />
    </>
  );
};

export default function App() {
  const { user, isLoggedIn, logout } = useContext(AuthContext) || {};
  const [page, setPage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // ESTADOS PARA FIGARO (Solo Admin)
  const [adminData, setAdminData] = useState({ appointments: [], clients: [] });
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const ADMIN_EMAIL = 'francoledesma12@gmail.com';

  // 📡 EFECTO: Cargar datos para Fígaro si es admin
  useEffect(() => {
    if (user && user.email?.toLowerCase().trim() === ADMIN_EMAIL) {
      console.log("👑 Admin detectado en App.jsx: Cargando datos para Fígaro...");

      // 1. Turnos
      const qApp = query(collection(db, "appointments")); // Simplificado para evitar error de índice
      const unsubApp = onSnapshot(qApp, (snapshot) => {
        const apps = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setAdminData(prev => ({ ...prev, appointments: apps }));
      });

      // 2. Clientes
      const qCli = query(collection(db, "users"));
      const unsubCli = onSnapshot(qCli, (snapshot) => {
        const cls = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setAdminData(prev => ({ ...prev, clients: cls }));
      });

      return () => {
        unsubApp();
        unsubCli();
      };
    } else {
      setAdminData({ appointments: [], clients: [] });
    }
  }, [user]);

  // 📬 EFECTO: Cargar notificaciones no leídas
  useEffect(() => {
    if (!user) {
      setUnreadNotifications(0);
      return;
    }

    const qNotif = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      where("read", "==", false)
    );

    const unsubNotif = onSnapshot(qNotif, (snapshot) => {
      setUnreadNotifications(snapshot.size);
    });

    return () => unsubNotif();
  }, [user]);

  // 🔗 CAPTURAR CÓDIGO DE REFERIDO
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      localStorage.setItem('barber_referrer_id', refCode);
      console.log("Referido capturado:", refCode);
    }
  }, []);

  const goTo = (p, serviceId = null) => {
    console.log('🔍 App.jsx - goTo llamado con página:', p, 'serviceId:', serviceId);
    setSelectedServiceId(serviceId);
    setPage(p);
    window.history.pushState({ page: p, serviceId }, '', `#${p}`);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setPage(event.state.page);
        setSelectedServiceId(event.state.serviceId || null);
      } else {
        setPage('home');
        setSelectedServiceId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.history.replaceState({ page: 'home', serviceId: null }, '', '#home');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleLogout = () => {
    if (logout) logout();
    setPage('home');
  };

  let componentToRender;

  switch (page) {
    case 'profile':
      componentToRender = <ProfilePage
        onLogout={handleLogout}
        onGoToBooking={() => goTo('booking')}
        onGoToHome={() => goTo('home')}
        onGoToEditProfile={() => goTo('editProfile')}
        onGoToHistory={() => goTo('history')}
        onGoToInvite={() => goTo('invite')}
        onGoToCatalogue={() => goTo('catalogue')}
        onGoToReferral={() => goTo('referral')}
        onGoToBarberDashboard={() => goTo('barber-dashboard')}
      />;
      break;
    case 'booking':
      componentToRender = <BookingPage
        onBackToHome={() => goTo('home')}
        onGoToLogin={() => goTo('login')}
        initialServiceId={selectedServiceId}
      />;
      break;
    case 'login':
      componentToRender = <LoginPage
        onGoToHome={() => goTo('home')}
        onGoToRegister={() => goTo('register')}
        onLoginSuccess={() => goTo('profile')}
      />;
      break;
    case 'register':
      componentToRender = <RegisterPage
        onGoToLogin={() => goTo('login')}
        onRegisterSuccess={() => goTo('login')}
      />;
      break;
    case 'cortes':
      componentToRender = <CortesPage
        onBackToHome={() => goTo('home')}
        onGoToBooking={(id) => goTo('booking', id)}
      />;
      break;
    case 'rewards':
      componentToRender = <RewardsPage onBackToHome={() => goTo('home')} onGoToCatalogue={() => goTo('catalogue')} />;
      break;
    case 'catalogue':
      componentToRender = <CataloguePage onBackToHome={() => goTo('home')} />;
      break;
    case 'referral':
      componentToRender = <ReferralPage onBackToHome={() => goTo('home')} />;
      break;
    case 'editProfile':
      componentToRender = <EditProfilePage
        onGoToProfile={() => goTo('profile')}
        onLogout={handleLogout}
      />;
      break;
    case 'history':
      componentToRender = <HistoryPage onBackToProfile={() => goTo('profile')} />;
      break;
    case 'invite':
      componentToRender = <InvitePage onBackToProfile={() => goTo('profile')} />;
      break;
    case 'barberos':
      componentToRender = <BarberosPage
        onBackToHome={() => goTo('home')}
        onGoToBooking={() => goTo('booking')}
      />;
      break;
    case 'cursos':
      componentToRender = <CursosPage
        onBackToHome={() => goTo('home')}
      />;
      break;
    case 'notifications':
      componentToRender = <NotificationsPage onGoToHome={() => goTo('home')} />;
      break;
    case 'barber-dashboard':
      componentToRender = <BarberDashboard onBackToHome={() => goTo('home')} />;
      break;
    case 'home':
    default:
      componentToRender = <HomePage
        onGoToBooking={(id) => goTo('booking', id)}
        onGoToLogin={() => {
          if (isLoggedIn) {
            goTo('profile');
          } else {
            goTo('login');
          }
        }}
        onGoToCortes={() => goTo('cortes')}
        onGoToRewards={() => goTo('rewards')}
        onGoToCatalogue={() => goTo('catalogue')}
        onGoToBarberos={() => goTo('barberos')}
        onGoToCursos={() => goTo('cursos')}
        onGoToReferral={() => goTo('referral')}
        isLoggedIn={isLoggedIn}
        user={user}
      />;
      break;
  }

  return (
    <div className="app-shell">
      {componentToRender}
      {user && user.email === ADMIN_EMAIL && (
        <FigaroChat appointments={adminData.appointments} clients={adminData.clients} />
      )}
    </div>
  );
}