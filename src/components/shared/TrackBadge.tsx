import { LEARNING_TRACKS, TrackId } from '../../lib/constants';

interface TrackBadgeProps {
  trackId: TrackId;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showDescription?: boolean;
}

export function TrackBadge({ trackId, size = 'md', showIcon = true, showDescription = false }: TrackBadgeProps) {
  const track = LEARNING_TRACKS[trackId];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2',
  };

  return (
    <div className={`inline-flex items-center gap-2 ${sizeClasses[size]} rounded-lg ${track.bgColor} border ${track.borderColor}`}>
      {showIcon && <span>{track.icon}</span>}
      <span className={track.textColor}>{track.name}</span>
      {showDescription && (
        <span className="text-slate-400 text-xs ml-2">— {track.description}</span>
      )}
    </div>
  );
}
