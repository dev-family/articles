This article is an experiment with Rust with its subsequent compilation in WASM.
It was interesting to try these technologies on something more difficult than calculating a factorial, so
the choice fell on the well-known 2048 game.

# Game

The original game represents a 4 by 4 square field. Each square can be either empty or occupied by a tile
with a number that is a power of 2. The starting state of the field has 2 filled cells.

<p align="center">
  <img src="https://github.com/dev-family/articles/blob/2048-wasm/2048-wasm/images/starting-state.png">
</p>

The player can make a move in one of 4 directions: left, right, up and down, moving all tiles all the way in the
selected direction. A new tile appears after each move. The new tile will contain a 2 with a 90% probability or a 4
with a probability of 10%.

For example, lets move from the starting state shown above to the right:

<p align="center">
  <img src="https://github.com/dev-family/articles/blob/2048-wasm/2048-wasm/images/first-move.png">
</p>

The tile on the second row rested against the right border, and a 2 appeared on the first row, the third column.

If a tile rests on another tile containing the same number, they are merge into one tile of the next power of two.

Lets move up from the previous state:

<p align="center">
  <img src="https://github.com/dev-family/articles/blob/2048-wasm/2048-wasm/images/second-move.png">
</p>

Twos of the last column of the first and second rows merged into one, and in addition, a four appeared on the third row.

Purpose of the game: reach the tile with the number 2048.

# Preparation

Since one of the goals of this experiment for me was to play with Rust, there is no task of choosing a language.

[This page] (https://awesomeopensource.com/project/flosse/rust-web-framework-comparison) provides a list of front-end frameworks for Rust.
The most popular option - [Yew] (https://yew.rs/) - looks interesting, especially if you have experience with React.

Instructions for creating a project can be found [here] (https://yew.rs/docs/en/getting-started/build-a-sample-app):

```bash
cargo new --lib rust-2048 && cd rust-2048
```

Next, add dependencies to Cargo.toml:

```toml
[dependencies]
yew = "0.17"
wasm-bindgen = "0.2.67"
```

The example provides code for creating a simple counter. `src/lib.rs`:

```rust
use wasm_bindgen::prelude::*;
use yew::prelude::*;

struct Model {
    link: ComponentLink<Self>,
    value: i64,
}

enum Msg {
    AddOne,
}

impl Component for Model {
    type Message = Msg;
    type Properties = ();
    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            value: 0,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::AddOne => self.value += 1
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        // Should only return "true" if new properties are different to
        // previously received properties.
        // This component has no properties so we will always return "false".
        false
    }

    fn view(&self) -> Html {
        html! {
            <div>
                <button onclick=self.link.callback(|_| Msg::AddOne)>{ "+1" }</button>
                <p>{ self.value }</p>
            </div>
        }
    }
}

#[wasm_bindgen(start)]
pub fn run_app() {
    App::<Model>::new().mount_to_body();
}
```

Create a directory for static files:

```bash
mkdir static
```

Inside it we create index.html with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Yew Sample App</title>
    <script type="module">
      import init from "./wasm.js";
      init();
    </script>
  </head>
  <body></body>
</html>
```

Build the project using wasm-pack (installed via cargo install wasm-pack):

```bash
wasm-pack build --target web --out-name wasm --out-dir ./static
```

I got the following error while building:

```text
Error: crate-type must be cdylib to compile to wasm32-unknown-unknown. Add the following to your Cargo.toml file:

[lib]
crate-type = ["cdylib", "rlib"]
```

Okay, so let's do it. Open Cargo.toml and add at the end:

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Now we can start any static server and check the result (in the example they suggest installing miniserve, but I will use a standard Python module):

```bash
cd static
python -m SimpleHTTPServer
```

Open http://127.0.0.1:8000 and see the working counter. Great, now we can start building the game itself.

# Basics

Commit: https://github.com/dev-family/wasm-2048/commit/6bc015fbc88c1633f4605944fd920b2780e261c1

Here I described the basic logic of the game and implemented moving tiles without merging. Also, I've added
helper structures and methods for convenience.

Let's consider the logic of the movement of tiles using this field as an example:

```text
2, 4, 0, 0
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

Suppose a move was made to the right. The following result is expected:

```text
0, 0, 2, 4
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

This behavior can be achieved if you go from the end of the selected direction and move all the tiles in the selected direction.
I will iterate manually for a better understanding:

1. Selected direction is right => go from right to left.

```text
         /-------- empty cell, skip
2, 4, 0, 0
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

2.

```text
      /-------- empty cell, skip
2, 4, 0, 0
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

3.

```text
    /-------- start to shift to the right
2, 4, 0, 0
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

4.

```text
       /-------- continue
2, 0, 4, 0
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

5.

```text
         /-------- reached the end, return to the next position from which we began to move
2, 0, 0, 4
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

6.

```text
 /-------- move to the right
2, 0, 0, 4
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

7.

```text
    /-------- continue
0, 2, 0, 4
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

8.

```text
       /-------- stop and go to the next line
0, 0, 2, 4
0, 0, 0, 0
0, 0, 0, 0
0, 0, 0, 0
```

It is also worth noting that in the case of horizontal moves, the rows move independently of each other, and in the case of vertical moves, the columns.

In the code, this algorithm is implemented by the methods `Direction#build_traversal` (building a path to traverse the field),
`Grid#traverse_from` (movement of a specific cell in the direction) and` Grid#move_in` is a public method using the previous two.

# Unions

Commit: https://github.com/dev-family/wasm-2048/commit/7e08b5af6008e6f9d716d7c9a41b0810e869df9e

Combining tiles has one nuance: tiles do not merge more than once,
those in the case of overlapping 4 identical tiles, the result will be 2 tiles
of the next power. So, the tiles should have a certain state that is needed
to be dropped before each move.

Additionally, I had to change the structure of TestCase, because correct behavior can only be tested in more than
a one move.

# Adding new tiles

Commit: https://github.com/dev-family/wasm-2048/commit/6082409412f6c19943c453c5d706d57bbcef538b

The [rand] package (https://crates.io/crates/rand) is used for random, which also works in the WASM environment
by adding the `wasm-bindgen` feature.

In order not to break previous tests, which are not prepared for a new tiles
I've added a new flag field `enable_new_tiles` to the `Grid` structure.

Since new tiles need to be added only in the case of a valid move (i.e. at least one field change occurred during the move),
the `traverse_from` signature changes. The method now returns a boolean value that indicates whether there was movement.

# UI

Commit: https://github.com/dev-family/wasm-2048/commit/356e0889a84d7fc2582662e76238f94fc69bfed7

The UI part is pretty simple to implement, especially for those familiar with React and/or JSX. You can read about the `html!` Macro from Yew [here] (https://yew.rs/docs/en/concepts/html/),
and about components in general [here] (https://yew.rs/docs/en/concepts/components). It reminds me a lot of React in pre-hook times.

There was no documentation of working with the keyboard, and, in principle, the services are not documented in any way, so you need to read the sources, watch examples.

# Animations

Commit: https://github.com/dev-family/wasm-2048/commit/e258748ab114ec5f930dbeb77d674bdbc5e63b1a.

To make the interface look more live, we need to add animations.

They are implemented on top of regular CSS transitions. We make tiles to remember their previous position then while rendering we display the tile immediately in the old position, and on the next tick - in the new one.
