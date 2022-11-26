import React, { memo, PropsWithChildren } from 'react'
import { Classes, ItemType, TEvent } from './DnDMaker'
import { styles } from './styles'

interface IProps extends PropsWithChildren {
  item: ItemType
  classes: Classes | undefined
  placeholder: string
  handleDragStart: (e: TEvent) => void
}

const DnDItem: React.FC<IProps> = (props) => {
  const { item, classes, placeholder, children, handleDragStart } = props

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    target.style.opacity = '1'
  }

  if (item.value === 'placeholder') {
    return (
      <div style={{ ...styles.placeholder }} className={classes?.placeholder}>
        {placeholder}
      </div>
    )
  }

  return (
    <div
      id={item.id}
      style={{ ...styles.item }}
      className={classes?.item}
      draggable
      onDragStart={handleDragStart}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default memo(DnDItem)
