use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Copy, Clone, Debug)]
pub enum Color {
    White,
    Yellow,
    Blue,
    Orange,
    Red,
    Green,
}

#[derive(Serialize, Deserialize, Copy, Clone, Debug)]
pub struct CubeColor {
    pub front: Option<Color>,
    pub back: Option<Color>,
    pub right: Option<Color>,
    pub left: Option<Color>,
    pub up: Option<Color>,
    pub down: Option<Color>,
}

#[derive(Serialize, Deserialize, Copy, Clone, Debug)]
pub enum Axis {
    X,
    Y,
    Z,
}

#[derive(Serialize, Deserialize, Copy, Clone, Debug, PartialEq)]
pub enum Direction {
    Forwards,
    Backwards,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Instruction {
    pub cube_index: usize,
    pub axis: Axis,
    pub direction: Direction,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct JsonResponse {
    pub error_message: Option<String>,
    pub data: Option<[CubeColor; 27]>,
}

pub struct RotationIndices {
    pub rotation: [usize; 8],
    pub non_rotation: usize,
}
