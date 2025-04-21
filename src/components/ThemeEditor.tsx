import { useTheme } from '../store/useTheme';

export default function ThemeEditor() {
  const { theme, setTheme, resetTheme } = useTheme();

  return (
    <form
      style={{
        margin: '1rem 0',
        width: 260,
        padding: 12,
        background: '#fff',
        border: '1px solid #dadce0',
        borderRadius: 8,
        fontSize: 14
      }}
    >
      <h3 style={{ margin: '0 0 8px' }}>Theme</h3>
      {(['primary', 'secondary', 'background', 'text'] as const).map((k) => (
        <label key={k} style={{ display: 'block', marginBottom: 6 }}>
          {k}: <input type="color" value={theme[k] as string} onInput={(e) => setTheme({ [k]: (e.target as HTMLInputElement).value })} />
        </label>
      ))}
      <label style={{ display: 'block', marginBottom: 6 }}>
        radius: <input type="text" value={theme.radius} onInput={(e) => setTheme({ radius: (e.target as HTMLInputElement).value })} />
      </label>
      <label style={{ display: 'block', marginBottom: 10 }}>
        spacing: <input type="text" value={theme.spacing} onInput={(e) => setTheme({ spacing: (e.target as HTMLInputElement).value })} />
      </label>
      <button type="button" className="button" onClick={resetTheme} style={{ width: '100%' }}>
        Reset
      </button>
    </form>
  );
}