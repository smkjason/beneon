# beneon

A SwiftUI iOS application.

## Requirements

- Xcode 16+
- iOS 17.0+
- [XcodeGen](https://github.com/yonaskolb/XcodeGen) (for project generation)

## Getting Started

Generate the Xcode project:

```bash
xcodegen generate
```

Open in Xcode:

```bash
open beneon.xcodeproj
```

Select your development team in the project settings, then build and run on a simulator or device.

## Project Structure

```
beneon/
├── beneon/
│   ├── Sources/          # Swift source files
│   └── Resources/        # Assets, Info.plist
├── project.yml           # XcodeGen project spec
└── README.md
```
