import styles from './FloatingWhatsApp.module.css';
import { WHATSAPP_URL } from '../config/location.js';

// Shared floating WhatsApp button for the main service pages (Vehicle
// Wraps, PPF, Ceramic Coating, Window Tint). One component, one place to
// maintain — drop <FloatingWhatsApp /> into a page to add it.
export default function FloatingWhatsApp() {
  if (!WHATSAPP_URL) return null; // location doesn't offer WhatsApp
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat with Wraptors on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={styles.icon}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.77.462 3.492 1.34 5.008L2 22l5.104-1.34A9.958 9.958 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.267a8.24 8.24 0 0 1-4.2-1.15l-.301-.179-3.03.795.809-2.954-.196-.303a8.258 8.258 0 0 1-1.264-4.396c0-4.568 3.716-8.284 8.285-8.284 4.568 0 8.284 3.716 8.284 8.284 0 4.569-3.716 8.187-8.387 8.187z" />
      </svg>
    </a>
  );
}
