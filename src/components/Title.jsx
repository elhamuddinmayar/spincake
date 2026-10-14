import Reveal from './Reveal'

// Renders a translated title given as [before, emphasised, after]
export function Title({ parts, className = '', emClass = 'text-gold-deep', as: Tag = 'h2' }) {
  const [pre, em, post] = parts
  return (
    <Tag className={className}>
      {pre} <em className={emClass}>{em}</em>
      {post && ` ${post}`}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, center = false, light = false, className = '' }) {
  return (
    <Reveal className={`${center ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      <p className={`eyebrow ${center ? 'justify-center' : ''} ${light ? '!text-gold' : ''}`}>
        <span className="h-px w-8 bg-gold" /> {eyebrow}
        {center && <span className="h-px w-8 bg-gold" />}
      </p>
      <Title parts={title} className="section-title mt-4" emClass={light ? 'text-gold' : 'text-gold-deep'} />
    </Reveal>
  )
}
