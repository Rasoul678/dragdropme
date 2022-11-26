import React, { memo, PropsWithChildren } from 'react'
import { Classes, ItemType, TEvent } from './DnDMaker'
import { styles } from './styles'

interface IProps extends PropsWithChildren {
  item: ItemType
  classes: Classes | undefined
  placeholder: string
  handleDragStart: (e: TEvent) => void
}

const DnDItem: React.FC<IProps> = ({ item, classes, placeholder, children, handleDragStart }) => {
  if (item.value === 'placeholder') {
    return (
      <div style={{ ...styles.placeholder }} className={classes?.placeholder}>
        {placeholder}
      </div>
    )
  }

  return (
    <div id={item.id} style={{ ...styles.item }} className={classes?.item} draggable onDragStart={handleDragStart}>
      {children}
    </div>
  )
}

export default memo(DnDItem)
