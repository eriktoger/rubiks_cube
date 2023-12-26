use crate::{
    constants::{
        ROTATE_X_INDICES, ROTATE_Y_INDICES, ROTATE_Z_INDICES, X_ROTATION, Y_ROTATION, Z_ROTATION,
    },
    structs::{Axis, CubeColor, Direction, Instruction, RotationIndices},
};

fn find_indices<'a>(
    indices_by_axis: &'a [RotationIndices; 3],
    cube_index: usize,
) -> &RotationIndices {
    indices_by_axis
        .iter()
        .find(|rotation_indicies| {
            rotation_indicies.non_rotation == cube_index
                || rotation_indicies
                    .rotation
                    .iter()
                    .find(|index| **index == cube_index)
                    .is_some()
        })
        .unwrap()
}

fn create_new_cube(
    cube_colors: &[CubeColor; 27],
    rotation_schema: [[&str; 2]; 6],
    index: usize,
    is_backwards: bool,
) -> CubeColor {
    let mut new_cube = cube_colors[index].clone();
    let old_cube = &cube_colors[index];
    for mut rotation in rotation_schema {
        if is_backwards {
            rotation.reverse();
        }

        let old_value = match rotation[1] {
            "front" => old_cube.front,
            "back" => old_cube.back,
            "left" => old_cube.left,
            "right" => old_cube.right,
            "up" => old_cube.up,
            "down" => old_cube.down,
            _ => None,
        };

        match rotation[0] {
            "front" => new_cube.front = old_value,
            "back" => new_cube.back = old_value,
            "left" => new_cube.left = old_value,
            "right" => new_cube.right = old_value,
            "up" => new_cube.up = old_value,
            "down" => new_cube.down = old_value,
            _ => {}
        };
    }
    return new_cube;
}

fn update_cube_colors<'a>(
    new_cube_colors: &'a mut [CubeColor; 27],
    new_cube: CubeColor,
    rotations: [usize; 8],
    i: usize,
) {
    if i + 2 == rotations.len() {
        new_cube_colors[rotations[0]] = new_cube;
    } else if i + 2 >= rotations.len() {
        new_cube_colors[rotations[1]] = new_cube;
    } else {
        new_cube_colors[rotations[i + 2]] = new_cube;
    }
}

pub fn rotate(cube_colors: [CubeColor; 27], instruction: Instruction) -> [CubeColor; 27] {
    let (indices_by_axis, rotation_schema) = match instruction.axis {
        Axis::X => (ROTATE_X_INDICES, X_ROTATION),
        Axis::Y => (ROTATE_Y_INDICES, Y_ROTATION),
        Axis::Z => (ROTATE_Z_INDICES, Z_ROTATION),
    };

    let indices = find_indices(&indices_by_axis, instruction.cube_index);

    let is_backwards = instruction.direction == Direction::Backwards;
    let mut rotations = indices.rotation;
    if is_backwards {
        rotations.reverse();
    }

    let mut new_cube_colors = cube_colors.clone();
    for (i, index) in rotations.iter().enumerate() {
        let new_cube = create_new_cube(&cube_colors, rotation_schema, *index, is_backwards);
        update_cube_colors(&mut new_cube_colors, new_cube, rotations, i);
    }

    return new_cube_colors;
}
