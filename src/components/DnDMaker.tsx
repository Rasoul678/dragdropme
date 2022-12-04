import React, { memo, useCallback, useRef, useState, cloneElement } from 'react'
import { styles } from './styles'
import autoAnimate from '@formkit/auto-animate'

export type ItemType = {
  id: string
  group: string
  value: string | JSX.Element
}

export type DragEvent = React.DragEvent<HTMLDivElement>

export interface Classes {
  wrapper?: string
  group?: string
  item?: string
  placeholder?: string
}

export interface Animation {
  enable?: boolean
  duration?: number
}

interface IProps {
  items: Record<string, Omit<ItemType, 'group'>[]>
  classes?: Classes
  placeholder?: string
  animation?: Animation
  onDrop?: (items: ItemType[], movedItem: ItemType) => void
  onDragStart?: (e: DragEvent, draggingItem: ItemType) => void
  onDragOver?: (e: DragEvent) => void
  renderItem?: JSX.Element
}

const DnDMaker: React.FC<IProps> = (props) => {
  const {
    items: defaultItems,
    onDrop,
    onDragStart,
    onDragOver,
    classes,
    placeholder = 'Drop!',
    renderItem,
    animation,
  } = props

  const { enable, duration } = animation || {}

  const addGroupToItem = (group: [string, Omit<ItemType, 'group'>[]]) => {
    const [groupName, items] = group
    return [groupName, items.map((item) => ({ ...item, group: groupName }))]
  }

  const nestedItems = Object.fromEntries(Object.entries(defaultItems).map(addGroupToItem))

  const flatItems = Object.values(nestedItems).flat() as ItemType[]
  const groups = Object.keys(nestedItems)

  const placeholderId = useRef(Math.random().toString(36).substring(2, 12))
  const [items, setItems] = useState(flatItems)
  const originRef = useRef('')
  const draggingElement = useRef<HTMLElement | null>(null)
  const hoverIdRef = useRef('')
  const sizeRef = useRef({ width: 0, height: 0 })
  const startYRef = useRef(0)
  const isAfterRef = useRef(true)

  //* Handle drag start
  const handleDragStart = useCallback(
    (e: DragEvent) => {
      const el = e.target as HTMLElement
      draggingElement.current = el
      e.dataTransfer.setData('text/plain', el.id)

      startYRef.current = e.pageY

      const { width, height } = el.getBoundingClientRect()

      sizeRef.current = {
        width: Math.trunc(width),
        height: Math.trunc(height),
      }

      const draggingItem = items.find((item) => item.id === el.id)

      if (draggingItem) {
        originRef.current = draggingItem.group
        onDragStart?.(e, draggingItem)
      }
    },
    [onDragStart, items],
  )

  //* Handle drop
  const handleDrop = (e: DragEvent, newGroup: string) => {
    const id = e.dataTransfer.getData('text/plain')

    //* Find the dragging item
    const movedItem = items.find((item) => item.id === id)
    let newItems

    if (movedItem) {
      //* Remove dragging item from items list
      newItems = items.filter((item) => item.id !== id)

      //* Change the group name
      movedItem.group = newGroup

      if (hoverIdRef.current) {
        //* Add to index
        let foundIndex = newItems.findIndex((item) => item.id === hoverIdRef.current)

        if (isAfterRef.current) {
          foundIndex += 1
        }

        newItems.splice(foundIndex, 0, movedItem)
      } else {
        //* Add to the end of the list
        newItems.push(movedItem)
      }

      //* Remove placeholder
      newItems = newItems.filter((item) => item.value !== 'placeholder')

      //* Set new items list
      setItems(newItems)

      //* Call onDrop callback
      onDrop?.(newItems, movedItem)
    }

    draggingElement.current = null
  }

  //* Handle drag over
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    const offsetY = e.pageY - startYRef.current

    isAfterRef.current = offsetY > 0

    startYRef.current = e.pageY

    const target = e.target as HTMLElement
    const currentTarget = e.currentTarget as HTMLElement

    const groupName = currentTarget.dataset.groupname
    const hoverElementID = findParentByType(target).id

    if (target.dataset.type === 'items-wrapper') {
      return
    }

    if (hoverElementID !== ':r1:') {
      hoverIdRef.current = hoverElementID
    }

    //* Exchange placeholder regarding to the group name
    if (groupName) {
      addPlaceholderTo(groupName, hoverElementID)

      if (originRef.current === groupName) {
        draggingElement.current!.style.visibility = 'hidden'
        draggingElement.current!.style.position = 'absolute'
      }

      onDragOver?.(e)
    }
  }

  //* handle drag leave
  const handleDragLeave = (e: DragEvent) => {
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
  const addPlaceholderTo = (groupName: string, id = '') => {
    if (id === placeholderId.current) return

    removePlaceholder()

    const placeHolder = {
      id: placeholderId.current,
      group: groupName,
      value: 'placeholder',
    }

    if (id) {
      setItems((oldItems) => {
        let foundIndex = oldItems.findIndex((item) => item.id === id)

        if (isAfterRef.current) {
          foundIndex += 1
        }

        const newItems = [...oldItems]
        newItems.splice(foundIndex, 0, placeHolder)
        return newItems
      })
    } else {
      setItems((oldItems) => {
        const newItems = [...oldItems, placeHolder]
        return newItems
      })
    }
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnd = (e: DragEvent) => {
    const target = e.target as HTMLElement
    target.style.visibility = 'unset'
    target.style.position = 'initial'
    removePlaceholder()
  }

  const findParentByType = (element: HTMLElement, neddle = 'item'): HTMLElement => {
    let parent: HTMLElement | null = null

    if ([neddle, 'group', 'placeholder'].includes(element.getAttribute('data-type') || '')) {
      parent = element
    } else {
      while (!parent) {
        parent = findParentByType(element.parentElement!)
      }
    }

    return parent
  }

  return (
    <div style={{ ...styles.groups }} className={classes?.wrapper} data-groups='groups'>
      {groups.map((group) => {
        return (
          <div
            style={{ ...styles.group }}
            className={classes?.group}
            data-groupname={group}
            data-type='group'
            key={group}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, group)}
          >
            <h2 style={{ ...styles.groupTitle }}>{group}</h2>
            <div
              data-type='items-wrapper'
              style={{ ...styles.itemsWrapper }}
              ref={(ref) => enable && ref && autoAnimate(ref, { duration: duration ?? 150 })}
            >
              {items
                .filter((item) => item.group === group)
                .map((thing) => {
                  const { width, height } = sizeRef.current

                  //* Render placeholder
                  if (thing.value === 'placeholder') {
                    return (
                      <div
                        style={{
                          ...styles.placeholder,
                          width: `${width - 4}px`,
                          height: `${height + 15}px`,
                        }}
                        className={classes?.placeholder}
                        key={thing.id}
                        id={thing.id}
                        data-type='placeholder'
                      >
                        {placeholder}
                      </div>
                    )
                  }

                  //* Render items
                  return (
                    <div
                      id={thing.id}
                      key={thing.id}
                      data-type='item'
                      style={renderItem ? { cursor: 'grab' } : { ...styles.item }}
                      className={renderItem ? '' : classes?.item}
                      draggable
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    >
                      {renderItem ? cloneElement(renderItem, { item: thing }, null) : thing.value}
                    </div>
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(DnDMaker)
