import type { ActiveHandMode, HandMode } from '../../hooks/handMode';

interface GestureToolbarProps {
  mode: HandMode;
  onPress: (pressed: ActiveHandMode) => void;
  disabled?: boolean;
}

const BUTTONS: { mode: ActiveHandMode; label: string; title: string }[] = [
  { mode: 'gestures', label: 'Gestos', title: 'Controlar el modelo con la mano, sin mostrar la cámara' },
  { mode: 'gestures+camera', label: 'Gestos + cámara', title: 'Controlar el modelo con la mano y ver la cámara' },
];

/** Botones de la barra superior para elegir el modo de control por gestos. */
export default function GestureToolbar({ mode, onPress, disabled = false }: GestureToolbarProps) {
  return (
    <div role="group" aria-label="Control por gestos" style={{ display: 'flex', gap: '0.5rem' }}>
      {BUTTONS.map((b) => {
        const pressed = mode === b.mode;
        return (
          <button
            key={b.mode}
            type="button"
            aria-pressed={pressed}
            title={b.title}
            disabled={disabled}
            onClick={() => onPress(b.mode)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid',
              borderColor: pressed ? '#38bdf8' : '#1e293b',
              backgroundColor: pressed ? '#0369a1' : '#020617',
              color: '#f8fafc',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: disabled ? 'wait' : 'pointer',
              opacity: disabled ? 0.6 : 1,
              transition: 'all 0.15s ease',
            }}
          >
            {b.label}
          </button>
        );
      })}
    </div>
  );
}
