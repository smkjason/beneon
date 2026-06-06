import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "cross.fill")
                .font(.system(size: 48))
                .foregroundStyle(.primary)

            Text("jesus")
                .font(.largeTitle)
                .fontWeight(.semibold)

            Text("Welcome to your new iOS app.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
