use crate::structs::{Color, CubeColor, RotationIndices};

pub const X_ROTATION: [[&str; 2]; 6] = [
    ["front", "up"],
    ["up", "back"],
    ["back", "down"],
    ["down", "front"],
    ["right", "right"],
    ["left", "left"],
];

pub const Y_ROTATION: [[&str; 2]; 6] = [
    ["front", "right"],
    ["right", "back"],
    ["back", "left"],
    ["left", "front"],
    ["up", "up"],
    ["down", "down"],
];

pub const Z_ROTATION: [[&str; 2]; 6] = [
    ["up", "left"],
    ["left", "down"],
    ["down", "right"],
    ["right", "up"],
    ["front", "front"],
    ["back", "back"],
];

pub const ROTATE_X_INDICES: [RotationIndices; 3] = [
    RotationIndices {
        rotation: [0, 3, 6, 15, 24, 21, 18, 9],
        non_rotation: 12,
    },
    RotationIndices {
        rotation: [1, 4, 7, 16, 25, 22, 19, 10],
        non_rotation: 13,
    },
    RotationIndices {
        rotation: [2, 5, 8, 17, 26, 23, 20, 11],
        non_rotation: 14,
    },
];

pub const ROTATE_Y_INDICES: [RotationIndices; 3] = [
    RotationIndices {
        rotation: [9, 0, 1, 2, 11, 20, 19, 18],
        non_rotation: 10,
    },
    RotationIndices {
        rotation: [12, 3, 4, 5, 14, 23, 22, 21],
        non_rotation: 13,
    },
    RotationIndices {
        rotation: [15, 6, 7, 8, 17, 26, 25, 24],
        non_rotation: 16,
    },
];

pub const ROTATE_Z_INDICES: [RotationIndices; 3] = [
    RotationIndices {
        rotation: [21, 24, 25, 26, 23, 20, 19, 18],
        non_rotation: 22,
    },
    RotationIndices {
        rotation: [15, 16, 17, 14, 11, 10, 9, 12],
        non_rotation: 13,
    },
    RotationIndices {
        rotation: [0, 3, 6, 7, 8, 5, 2, 1],
        non_rotation: 4,
    },
];

pub const INITIAL_CUBE_COLORS: [CubeColor; 27] = [
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: None,
        left: Some(Color::Blue),
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: None,
        left: None,
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: Some(Color::Green),
        left: None,
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: None,
        left: Some(Color::Blue),
        down: None,
        up: None,
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: None,
        left: None,
        down: None,
        up: None,
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: Some(Color::Green),
        left: None,
        down: None,
        up: None,
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: None,
        left: Some(Color::Blue),
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: None,
        left: None,
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: None,
        back: Some(Color::Yellow),
        right: Some(Color::Green),
        left: None,
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: None,
        back: None,
        right: None,
        left: Some(Color::Blue),
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: None,
        back: None,
        right: None,
        left: None,
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: None,
        back: None,
        right: Some(Color::Green),
        left: None,
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: None,
        back: None,
        right: None,
        left: Some(Color::Blue),
        down: None,
        up: None,
    },
    //   {} /*CenterCube index 13*/,
    CubeColor {
        front: None,
        back: None,
        right: None,
        left: None,
        down: None,
        up: None,
    },
    CubeColor {
        front: None,
        back: None,
        right: Some(Color::Green),
        left: None,
        down: None,
        up: None,
    },
    CubeColor {
        front: None,
        back: None,
        right: None,
        left: Some(Color::Blue),
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: None,
        back: None,
        right: None,
        left: None,
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: None,
        back: None,
        right: Some(Color::Green),
        left: None,
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: Some(Color::Green),
        left: Some(Color::Blue),
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: None,
        left: None,
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: Some(Color::Green),
        left: None,
        down: Some(Color::Orange),
        up: None,
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: None,
        left: Some(Color::Blue),
        down: None,
        up: None,
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: None,
        left: None,
        down: None,
        up: None,
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: Some(Color::Green),
        left: None,
        down: None,
        up: None,
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: None,
        left: Some(Color::Blue),
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: None,
        left: None,
        down: None,
        up: Some(Color::Red),
    },
    CubeColor {
        front: Some(Color::White),
        back: None,
        right: Some(Color::Green),
        left: None,
        down: None,
        up: Some(Color::Red),
    },
];
