import React from 'react'

const Container = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-[auto_1fr] h-screen bg-black">{children}</div>
  },

  Sidebar: React.memo(function Header({ children }: { children: React.ReactNode }) {
    return <div className="flex h-screen">{children}</div>
  }),

  Main: function Content({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-rows-[auto_1fr_auto] h-screen">{children}</div>
  },

  Topbar: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex border-b">{children}</div>
  },

  Content: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex overflow-y-auto">{children}</div>
  },

  Footer: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex border-t">{children}</div>
  }
}

export default Container
