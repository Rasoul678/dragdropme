import React, { memo, useCallback, useId, useRef, useState } from 'react'
import DnDItem from './DnDItem'
import { styles } from './styles'

export type ItemType = {
  id: string
  group: string
  value: string
}

export type TEvent = React.DragEvent<HTMLDivElement>

export interface Classes {
  wrapper?: string
  group?: string
  item?: string
  placeholder?: string
}

interface IProps {
  defaultItems: ItemType[]
  groups: string[]
  classes?: Classes
  placeholder?: string
  onDrop?: (items: ItemType[], movedItem: ItemType) => void
  onDragStart?: (e: TEvent, draggingItem: ItemType) => void
  onDragOver?: (e: TEvent) => void
}

const DnDMaker: React.FC<IProps> = (props) => {
  const { defaultItems = [], groups = [], onDrop, onDragStart, onDragOver, classes, placeholder = 'Drop!' } = props
  const newId = useId()
  const [items, setItems] = useState(defaultItems)
  const [originGroup, setOriginGroup] = useState('')
  const draggingElement = useRef<HTMLElement | null>(null)

  //* Handle drag start
  const handleDragStart = useCallback(
    (e: TEvent) => {
      const el = e.target as HTMLElement
      draggingElement.current = el
      e.dataTransfer.setData('text/plain', el.id)

      const draggingItem: ItemType | undefined = items.find((item) => item.id === el.id)

      if (draggingItem) {
        setOriginGroup(draggingItem.group)
        onDragStart?.(e, draggingItem)
      }

      requestAnimationFrame(() => {
        el.style.opacity = '0.5'
      })
    },
    [onDragStart, items],
  )

  //* Handle drop
  const handleDrop = (e: TEvent, newGroup: string) => {
    const id = e.dataTransfer.getData('text/plain')

    //* Find the dragging item
    const movedItem = items.find((item) => item.id === id)
    let newItems
    const draggingGroup = draggingElement.current?.parentElement?.parentElement?.dataset.groupname

    if (movedItem && draggingGroup !== newGroup) {
      //* Remove dragging item from items list
      newItems = items.filter((item) => item.id !== id)
      //* Change the group name
      movedItem.group = newGroup
      //* Add to the end of the list and remove placeholder
      newItems = [...newItems, movedItem].filter((item) => item.value !== 'placeholder')

      //* Set new items list
      setItems(newItems)
      onDrop?.(newItems, movedItem)
    }

    draggingElement.current = null
  }

  //* Handle drag over
  const handleDragOver = (e: TEvent) => {
    e.preventDefault()

    const groupName = (e.target as HTMLElement).dataset.groupname

    //* Exchange placeholder regarding to the group name
    if (groupName) {
      if (originGroup !== groupName) {
        addPlaceholderTo(groupName)
      }
      onDragOver?.(e)
    }
  }

  //* handle drag leave
  const handleDragLeave = (e: TEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement
    //* Remove placeholder if mouse leaves the groups area
    if (relatedTarget.dataset.groups === 'groups') {
      removePlaceholder()
    }
  }

  //* Remove existing placeholder
  const removePlaceholder = () => {
    setItems((oldItems) => {
      const newItems = oldItems.filter((item) => item.value !== 'placeholder')
      return newItems
    })
  }

  //* Add placeholder to a column
  const addPlaceholderTo = (groupName: string) => {
    removePlaceholder()
    const placeHolder = {
      id: newId,
      group: groupName,
      value: 'placeholder',
    }
    setItems((oldItems) => {
      const newItems = [...oldItems, placeHolder]
      return newItems
    })
  }

  const handleDragEnter = (e: TEvent) => {
    e.preventDefault()
  }

  const dragEnterGroups = (e: TEvent) => {
    e.preventDefault()
  }

  const dragOverGroups = (e: TEvent) => {
    e.preventDefault()
  }

  //* Handle drop between groups
  const dropGroups = () => {
    if (draggingElement.current) {
      draggingElement.current.style.opacity = '1'
    }

    draggingElement.current = null
  }

  return (
    <div
      style={{ ...styles.groups }}
      className={classes?.wrapper}
      data-groups='groups'
      onDragEnter={dragEnterGroups}
      onDragOver={dragOverGroups}
      onDrop={dropGroups}
    >
      {groups.map((group) => (
        <div
          style={{ ...styles.group }}
          className={classes?.group}
          data-groupname={group}
          key={group}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, group)}
        >
          <h2 style={{ ...styles.groupTitle }}>{group}</h2>
          <div>
            {items
              .filter((item) => item.group === group)
              .map((thing) => {
                return (
                  <DnDItem
                    key={thing.id}
                    handleDragStart={handleDragStart}
                    classes={classes}
                    placeholder={placeholder}
                    item={thing}
                  >
                    {thing.value}
                  </DnDItem>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(DnDMaker)
