mod constants;
mod functions;
mod structs;

use constants::INITIAL_CUBE_COLORS;
use functions::rotate;
use serde_json;
use structs::{CubeColor, Instruction, JsonResponse};
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

#[wasm_bindgen]
pub fn get_initial_cube_colors() -> JsValue {
    let json = serde_json::to_string(&INITIAL_CUBE_COLORS).unwrap();
    JsValue::from_str(&json)
}

#[wasm_bindgen]
pub fn rotate_cube_colors(cube_colors: JsValue, instructions: JsValue) -> JsValue {
    let cube_colors: Result<[CubeColor; 27], serde_wasm_bindgen::Error> =
        serde_wasm_bindgen::from_value(cube_colors);
    let instructions: Result<Vec<Instruction>, serde_wasm_bindgen::Error> =
        serde_wasm_bindgen::from_value(instructions);

    if cube_colors.is_err() {
        let response = JsonResponse {
            error_message: Some(cube_colors.unwrap_err().to_string()),
            data: None,
        };
        let json = serde_json::to_string(&response).unwrap();
        return JsValue::from_str(&json);
    }

    if instructions.is_err() {
        let response = JsonResponse {
            error_message: Some(instructions.unwrap_err().to_string()),
            data: None,
        };
        let json = serde_json::to_string(&response).unwrap();
        return JsValue::from_str(&json);
    }

    let instructions = instructions.expect("Is checked");
    let mut cube_colors = cube_colors.expect("Is checked");

    for instruction in instructions {
        cube_colors = rotate(cube_colors, instruction);
    }

    let response = JsonResponse {
        error_message: None,
        data: Some(cube_colors),
    };

    let json = serde_json::to_string(&response).unwrap();
    return JsValue::from_str(&json);
}
