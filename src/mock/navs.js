/**
 * mock navs
 */

export default [{
  name: 'todo',
  icon: 'ordered-list',
  key: '/app/todo',
  href: '/app/todo'
}, {
  name: 'demo',
  icon: 'appstore',
  key: '/app/demo',
  href: '/app/demo',
  children: [
    {
      name: 'todo',
      key: '/app/demo/todo',
      href: '/app/demo/todo'
    }
  ]
}];