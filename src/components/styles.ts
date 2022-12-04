import { CSSProperties } from 'react'

export const styles: { [key: string]: CSSProperties } = {
  groups: {
    display: 'flex',
    margin: '20px',
    padding: '20px',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  group: {
    minHeight: '10rem',
    width: '13rem',
    border: '2px solid #121212',
    borderRadius: '10px',
    paddingBottom: '1.5rem',
  },
  groupTitle: {
    padding: 0,
    marginTop: '0.5rem',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '5px',
  },
  item: {
    backgroundColor: 'rgba(100, 102,149,1)',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'grab',
  },
  placeholder: {
    fontWeight: 700,
    backgroundColor: '#fff',
    border: '2px dashed rgba(18, 18, 18, 0.7)',
    borderRadius: '5px',
    textAlign: 'center',
    color: 'rgba(18, 18, 18, 0.7)',
    display: 'grid',
    placeItems: 'center',
    margin: "5px 0",
  },
}
