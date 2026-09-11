# 📱 foldify

**Seamless React components and hooks for foldable devices and dual-screens.**

As hardware evolves, web applications need to adapt to new form factors like the Samsung Galaxy Z Fold, Google Pixel Fold, Microsoft Surface Duo, and now Apple's iPhone Duo. `foldify` bridges the gap between React's declarative nature and the emerging W3C Viewport Segments and Device Posture APIs. 

Stop worrying about hinges swallowing your content, and start building beautiful, book-like experiences.

https://github.com/user-attachments/assets/777d6d8c-c790-47aa-99a5-d74e3f2d14e1

## 📦 Installation

npm install @summonair/foldify

## 🛠️ The Hooks API

### `useViewportSegments()`
Returns an array of screen segments. On a standard phone, this returns one segment. On a dual-screen device, it returns two `DOMRect` objects detailing the dimensions of each screen.

### `useDevicePosture()`
Know if the device is flat on a table (`continuous`) or bent like a laptop (`folded`).

## 🧩 Layout Components

### `<FoldGrid>`
Automatically snaps content to separate screens if a physical fold or hinge is detected. If on a normal device, it stacks them based on your fallback props.

### `<HingeSafeArea>`
Ensure critical UI isn't lost in the physical seam of the device. This component automatically applies padding equivalent to the hinge width.

## ⚠️ Browser Support
`foldify` relies on emerging W3C specifications. It is designed with graceful degradation and is completely safe to use in all modern browsers.

## 🤝 Contributing
Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions and guidelines.

## 📄 License
[MIT](./LICENSE)

## ☕ Support
If `foldify` saved you some hinge-related headaches, consider [buying me a coffee](https://buymeacoffee.com/summonair).
